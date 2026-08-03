#!/usr/bin/env ruby
# frozen_string_literal: true

path = ARGV.fetch(0, "loon/loon.lcf")
raise "#{path} must use the Loon .lcf suffix" unless File.extname(path) == ".lcf"

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

general_entries = parsed["General"].map do |line_number, line|
  key, value = line.split("=", 2)
  raise "#{path}:#{line_number} has invalid General syntax" unless key && value && !value.empty?

  [key, value]
end
general_keys = general_entries.map(&:first)
raise "#{path} contains duplicate General keys" unless general_keys.uniq == general_keys

general = general_entries.to_h
required_general_keys = %w[
  ip-mode ipv6-vif dns-server sni-sniffing dns-reject-mode domain-reject-mode
  udp-fallback-mode internet-test-url proxy-test-url resource-parser geoip-url ipasn-url
  skip-proxy bypass-tun
]
missing_general_keys = required_general_keys - general.keys
raise "#{path} is missing required General keys: #{missing_general_keys.join(', ')}" unless missing_general_keys.empty?

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

  option_keys = fields.drop(members.size).map do |option|
    key, value = option.split("=", 2)
    raise "#{path}:#{line_number} has invalid Proxy Group option #{option}" unless key && value && !value.empty?

    key
  end
  allowed_options = case type
                    when "url-test" then %w[interval tolerance img-url]
                    when "fallback" then %w[interval max-timeout img-url]
                    when "load-balance" then %w[interval max-timeout algorithm img-url]
                    else %w[img-url]
                    end
  unknown_options = option_keys - allowed_options
  unless unknown_options.empty?
    raise "#{path}:#{line_number} Proxy Group #{name} has unsupported options: #{unknown_options.join(', ')}"
  end
  raise "#{path}:#{line_number} Proxy Group #{name} repeats options" unless option_keys.uniq == option_keys

  groups[name] = { type: type, members: members, option_keys: option_keys }
end
raise "#{path} must define at least one Proxy Group" if groups.empty?
required_groups = %w[
  代理策略 Auto 兜底策略 国际基础服务 Apple服务 AI 国际社媒 国际流媒体 Emby
  Game SpeedTest 国内下载 国际下载 香港 台湾 新加坡 日本 韩国 美国 英国
]
missing_groups = required_groups - groups.keys
raise "#{path} is missing required Proxy Groups: #{missing_groups.join(', ')}" unless missing_groups.empty?

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

local_rule_lines = parsed["Rule"].map(&:last)
raise "#{path} contains duplicate local rules" unless local_rule_lines.uniq == local_rule_lines
required_geoip_rules = %w[
  GEOIP,CN,DIRECT
  GEOIP,SG,新加坡
  GEOIP,TW,台湾
  GEOIP,HK,香港
  GEOIP,JP,日本
  GEOIP,KR,韩国
  GEOIP,US,美国
  GEOIP,GB,英国
]
missing_geoip_rules = required_geoip_rules - local_rule_lines
raise "#{path} is missing regional GeoIP fallbacks: #{missing_geoip_rules.join(', ')}" unless missing_geoip_rules.empty?

geoip_indexes = required_geoip_rules.map { |rule| local_rule_lines.index(rule) }
raise "#{path} regional GeoIP fallback order drifted" unless geoip_indexes == geoip_indexes.sort

rule_policies = parsed["Rule"].map do |line_number, line|
  parts = line.split(",").map(&:strip)
  rule_type = parts.first
  expected_fields = rule_type == "FINAL" ? 2 : 3
  unless %w[DOMAIN DOMAIN-SUFFIX IP-CIDR GEOIP FINAL].include?(rule_type) && parts.size == expected_fields
    raise "#{path}:#{line_number} has invalid local Rule syntax: #{line}"
  end

  policy = rule_type == "FINAL" ? parts[1] : parts[2]
  raise "#{path}:#{line_number} has invalid Rule syntax" unless policy

  policy
end
raise "#{path} must end local rules with FINAL,兜底策略" unless parsed["Rule"].last&.last == "FINAL,兜底策略"

remote_rules = parsed["Remote Rule"].map do |line_number, line|
  parts = line.split(",").map(&:strip)
  url = parts.shift
  unless url.match?(/\Ahttps:\/\/.+\.(?:lsr|list)\z/)
    raise "#{path}:#{line_number} Remote Rule URL must end in .lsr or .list"
  end

  option_entries = parts.map do |option|
    key, value = option.split("=", 2)
    raise "#{path}:#{line_number} has invalid Remote Rule option #{option}" unless key && value

    [key, value]
  end
  option_keys = option_entries.map(&:first)
  raise "#{path}:#{line_number} repeats Remote Rule options" unless option_keys.uniq == option_keys

  options = option_entries.to_h
  raise "#{path}:#{line_number} has incomplete Remote Rule options" unless options.keys.sort == %w[enabled policy tag]
  raise "#{path}:#{line_number} Remote Rule must be enabled" unless options["enabled"] == "true"

  { line_number: line_number, url: url, policy: options.fetch("policy"), tag: options.fetch("tag") }
end
remote_urls = remote_rules.map { |rule| rule[:url] }
remote_tags = remote_rules.map { |rule| rule[:tag] }
raise "#{path} contains duplicate Remote Rule URLs" unless remote_urls.uniq == remote_urls
raise "#{path} contains duplicate Remote Rule tags" unless remote_tags.uniq == remote_tags
remote_policies = remote_rules.map { |rule| rule[:policy] }

allowed_policies = groups.keys + %w[DIRECT REJECT REJECT-DROP]
missing_policies = (rule_policies + remote_policies).uniq - allowed_policies
raise "#{path} references missing policies: #{missing_policies.join(', ')}" unless missing_policies.empty?

required_remote_policies = {
  "Advertising" => "REJECT",
  "LAN" => "DIRECT",
  "Pre AI Infrastructure" => "国际基础服务",
  "AI Major" => "AI",
  "AI" => "AI",
  "Apple Push" => "DIRECT",
  "Apple Account" => "DIRECT",
  "App Store" => "Apple服务",
  "Apple Proxy" => "Apple服务",
  "Apple Direct" => "DIRECT",
  "China Download CDN" => "国内下载",
  "China Direct" => "DIRECT",
  "China Domains" => "DIRECT",
  "Speedtest Intl" => "SpeedTest",
  "Game" => "Game",
  "Telegram" => "国际社媒",
  "TikTok" => "国际社媒",
  "Twitter" => "国际社媒",
  "Facebook" => "国际社媒",
  "Instagram" => "国际社媒",
  "Threads" => "国际社媒",
  "WhatsApp" => "国际社媒",
  "Snapchat" => "国际社媒",
  "Reddit" => "国际社媒",
  "Discord" => "国际社媒",
  "Netflix" => "国际流媒体",
  "Disney Plus" => "国际流媒体",
  "HBO Max" => "国际流媒体",
  "YouTube" => "国际社媒",
  "YouTube Music" => "国际社媒",
  "Spotify" => "日本",
  "GitHub" => "国际基础服务",
  "GitLab" => "国际基础服务",
  "Notion" => "国际基础服务",
  "Scholar" => "国际基础服务",
  "Wikipedia" => "新加坡",
  "OneDrive" => "国际基础服务",
  "Dropbox" => "国际基础服务",
  "Cryptocurrency" => "代理策略",
  "AOL" => "国际基础服务",
  "Proton Mail" => "国际基础服务",
  "Cloudflare" => "国际基础服务",
  "Developer" => "国际基础服务",
  "Microsoft" => "国际基础服务",
  "Google" => "国际基础服务",
  "International Download CDN" => "国际下载",
  "Global Proxy" => "代理策略",
  "CN REGION" => "DIRECT"
}
rules_by_tag = remote_rules.to_h { |rule| [rule[:tag], rule] }
missing_tags = required_remote_policies.keys - rules_by_tag.keys
raise "#{path} is missing required Remote Rule categories: #{missing_tags.join(', ')}" unless missing_tags.empty?
required_remote_policies.each do |tag, expected_policy|
  actual_policy = rules_by_tag.fetch(tag)[:policy]
  next if actual_policy == expected_policy

  raise "#{path} Remote Rule #{tag} must use #{expected_policy}, got #{actual_policy}"
end
expected_tag_order = required_remote_policies.keys
actual_required_order = remote_tags.select { |tag| required_remote_policies.key?(tag) }
raise "#{path} Remote Rule category order drifted" unless actual_required_order == expected_tag_order

mitm = parsed["Mitm"].to_h do |line_number, line|
  key, value = line.split("=", 2)
  raise "#{path}:#{line_number} has invalid Mitm syntax" unless key && !value.nil?

  [key, value]
end
required_mitm_hosts = %w[g.cn www.g.cn google.cn www.google.cn ditu.google.cn maps.google.cn]
mitm_hosts = mitm.fetch("hostname", "").split(",").map(&:strip)
missing_mitm_hosts = required_mitm_hosts - mitm_hosts
unless parsed["Rewrite"].empty? || missing_mitm_hosts.empty?
  raise "#{path} Mitm hostname is missing Rewrite hosts: #{missing_mitm_hosts.join(', ')}"
end

parsed["Host"].each do |line_number, line|
  unless line.match?(/\A(?:\*\.)?[A-Za-z0-9.-]+\s*=\s*server:(?:https:\/\/[^\s]+|(?:\d{1,3}\.){3}\d{1,3})\z/)
    raise "#{path}:#{line_number} has invalid Host mapping syntax: #{line}"
  end
end

parsed["Rewrite"].each do |line_number, line|
  parts = line.split(/\s+/)
  unless parts.size == 3 && %w[301 302].include?(parts.last) && parts[1].match?(/\Ahttps?:\/\//)
    raise "#{path}:#{line_number} has invalid Rewrite syntax: #{line}"
  end
end

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
