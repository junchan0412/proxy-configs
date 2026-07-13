#!/usr/bin/env ruby
# frozen_string_literal: true

require "json"
require "yaml"

root_dir = File.expand_path("..", __dir__)
source_path = ARGV[0] || File.join(root_dir, "mihomo", "mihomo-override.yaml")
output_path = ARGV[1] || File.join(root_dir, "mihomo", "mihomo-override.js")

helper_keys = %w[
  FilterHK
  FilterTW
  FilterJP
  FilterKR
  FilterSG
  FilterUS
  FilterAll
  UrlTest
  FallBack
  LoadBalance
  RuleProviders
  TextRuleProviders
].freeze

yaml_override = YAML.load_file(source_path)
effective_override = yaml_override.reject { |key, _value| helper_keys.include?(key) }
json_override = JSON.pretty_generate(effective_override, ascii_only: false)

javascript = <<~JS
  // Generated from mihomo-override.yaml by scripts/generate-mihomo-js-override.rb.
  // Keep subscription proxies, proxy-providers, ports and controller settings intact.
  function main(config) {
    const override = #{json_override};

    Object.assign(config, override);
    return config;
  }
JS

File.write(output_path, javascript)
