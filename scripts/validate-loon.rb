#!/usr/bin/env ruby
# frozen_string_literal: true

path = ARGV.fetch(0, "loon/loon.conf")
text = File.read(path)
required_sections = [
  "General",
  "Proxy",
  "Remote Proxy",
  "Remote Filter",
  "Proxy Group",
  "Rule",
  "Remote Rule",
  "Host",
  "Rewrite",
  "Script",
  "Plugin",
  "Mitm"
]
sections = text.scan(/^\[([^\]]+)\]$/).flatten
raise "#{path} section order mismatch: #{sections.inspect}" unless sections == required_sections
raise "#{path} contains duplicate sections" unless sections.uniq == sections

parsed = Hash.new { |hash, key| hash[key] = [] }
section = nil
text.each_line.with_index(1) do |raw, line_number|
  line = raw.strip
  next if line.empty? || line.start_with?("#")

  if line.match?(/^\[[^\]]+\]$/)
    section = line[1..-2]
    next
  end

  raise "#{path}:#{line_number} contains content before a section" unless section

  parsed[section] << [line_number, line]
end

filters = {}
parsed["Remote Filter"].each do |line_number, line|
  match = line.match(/\A([^=]+)=NameRegex,\s*FilterKey="(.*)"\z/)
  raise "#{path}:#{line_number} has invalid Remote Filter syntax" unless match

  name, pattern = match.captures
  raise "#{path}:#{line_number} duplicates Remote Filter #{name}" if filters.key?(name)

  Regexp.new(pattern)
  filters[name] = pattern
end
raise "#{path} must define at least one Remote Filter" if filters.empty?

groups = {}
parsed["Proxy Group"].each do |line_number, line|
  name, expression = line.split("=", 2)
  raise "#{path}:#{line_number} has invalid Proxy Group syntax" unless name && expression
  raise "#{path}:#{line_number} uses reserved policy name #{name}" if %w[DIRECT REJECT PROXY].include?(name)
  raise "#{path}:#{line_number} duplicates Proxy Group #{name}" if groups.key?(name)

  fields = expression.split(",").map(&:strip)
  type = fields.shift
  raise "#{path}:#{line_number} uses unsupported Proxy Group type #{type}" unless %w[select url-test fallback load-balance].include?(type)

  members = fields.take_while { |field| !field.include?("=") }
  raise "#{path}:#{line_number} Proxy Group #{name} has no members" if members.empty?

  groups[name] = { type: type, members: members }
end
raise "#{path} must define at least one Proxy Group" if groups.empty?

allowed_members = groups.keys + filters.keys + %w[DIRECT REJECT REJECT-DROP]
groups.each do |name, group|
  missing = group[:members] - allowed_members
  raise "#{path} Proxy Group #{name} references missing members: #{missing.join(', ')}" unless missing.empty?

  next unless group[:type] == "url-test"

  filter_members = group[:members] & filters.keys
  unless filter_members.size == 1 && group[:members].size == 1
    raise "#{path} url-test Proxy Group #{name} must reference exactly one Remote Filter"
  end
end

rule_policies = parsed["Rule"].map do |line_number, line|
  parts = line.split(",").map(&:strip)
  policy = parts.first == "FINAL" ? parts[1] : parts[2]
  raise "#{path}:#{line_number} has invalid Rule syntax" unless policy

  policy
end
raise "#{path} must end local rules with FINAL" unless parsed["Rule"].last&.last&.start_with?("FINAL,")

remote_policies = parsed["Remote Rule"].map do |line_number, line|
  parts = line.split(",").map(&:strip)
  url = parts.shift
  raise "#{path}:#{line_number} has invalid Remote Rule URL" unless url.match?(/\Ahttps:\/\/.+\.lsr\z/)

  options = parts.to_h do |option|
    key, value = option.split("=", 2)
    raise "#{path}:#{line_number} has invalid Remote Rule option #{option}" unless key && value

    [key, value]
  end
  raise "#{path}:#{line_number} has incomplete Remote Rule options" unless options.keys.sort == %w[enabled policy tag]
  raise "#{path}:#{line_number} Remote Rule must be enabled" unless options["enabled"] == "true"

  options.fetch("policy")
end

allowed_policies = groups.keys + %w[DIRECT REJECT REJECT-DROP]
missing_policies = (rule_policies + remote_policies).uniq - allowed_policies
raise "#{path} references missing policies: #{missing_policies.join(', ')}" unless missing_policies.empty?

forbidden_patterns = [
  /policy-regex-filter/,
  /^RULE-SET,/,
  /^DOMAIN-SET,/,
  /pre-matching/,
  /dns-failed/,
  /^\[URL Rewrite\]$/,
  /^\[MITM\]$/
]
forbidden_patterns.each do |pattern|
  raise "#{path} contains Surge-only syntax matching #{pattern.inspect}" if text.match?(pattern)
end

puts "loon-validation-ok sections=#{sections.size} filters=#{filters.size} groups=#{groups.size} " \
     "rules=#{parsed['Rule'].size} remote_rules=#{parsed['Remote Rule'].size}"
