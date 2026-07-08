#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

SURGE_CLI="${SURGE_CLI:-/Applications/Surge.app/Contents/Applications/surge-cli}"
RG="${RG:-rg}"

if [[ ! -x "$SURGE_CLI" ]]; then
  echo "missing surge-cli: $SURGE_CLI" >&2
  exit 1
fi

if ! command -v "$RG" >/dev/null 2>&1; then
  echo "missing ripgrep; set RG=/path/to/rg" >&2
  exit 1
fi

echo "[1/6] Surge template check"
"$SURGE_CLI" -c surge/Surge.clean.conf

echo "[2/6] Mihomo YAML check"
/usr/bin/ruby - mihomo/mihomo.yaml mihomo/mihomo-override.yaml <<'RUBY'
require "yaml"

ARGV.each do |path|
  cfg = YAML.load_file(path)

  groups = cfg.fetch("proxy-groups", []).map { |group| group["name"] }
  raise "#{path} missing Apple服务 proxy group" unless groups.include?("Apple服务")
  by_name = cfg.fetch("proxy-groups", []).to_h { |group| [group["name"], group] }
  expected_proxy_order = %w[Auto 香港 新加坡 台湾 日本 韩国 美国 英国 DIRECT]
  raise "#{path} PROXY group order drifted" unless by_name.dig("PROXY", "proxies") == expected_proxy_order
  expected_community_order = %w[香港 新加坡 台湾 日本 美国 PROXY]
  raise "#{path} 国际社区 group order drifted" unless by_name.dig("国际社区", "proxies") == expected_community_order
  expected_game_order = %w[香港 日本 新加坡 台湾 韩国 美国 PROXY DIRECT]
  raise "#{path} Game group order drifted" unless by_name.dig("Game", "proxies") == expected_game_order
  expected_apple_order = %w[DIRECT 国际基础服务 PROXY 新加坡 美国]
  raise "#{path} Apple服务 group order drifted" unless by_name.dig("Apple服务", "proxies") == expected_apple_order
  expected_speedtest_order = %w[PROXY Auto 香港 新加坡 台湾 日本 韩国 美国 英国 DIRECT]
  raise "#{path} SpeedTest group order drifted" unless by_name.dig("SpeedTest", "proxies") == expected_speedtest_order

  icon_prefix = "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/"
  cfg.fetch("proxy-groups", []).each do |group|
    icon = group["icon"].to_s
    raise "#{path} #{group["name"]} icon must use Qure jsDelivr URL" unless icon.start_with?(icon_prefix)
  end

  urls = cfg.fetch("geox-url", {}).values
  urls += cfg.fetch("rule-providers", {}).values.map { |provider| provider.is_a?(Hash) ? provider["url"] : nil }
  urls += cfg.fetch("proxy-groups", []).map { |group| group["icon"] }
  raw_urls = urls.compact.select { |url| url.to_s.include?("raw.githubusercontent.com") }
  raise "#{path} should not use raw.githubusercontent.com URLs: #{raw_urls.join(", ")}" unless raw_urls.empty?

  providers = cfg.fetch("rule-providers", {}).keys.map(&:to_s)
  rules = cfg.fetch("rules", [])
  duplicate_rules = rules.group_by { |rule| rule }.select { |_rule, instances| instances.size > 1 }.keys
  raise "#{path} duplicate rules: #{duplicate_rules.join(" | ")}" unless duplicate_rules.empty?
  rules.grep(/^RULE-SET,/).each do |rule|
    provider = rule.split(",", 3)[1]
    raise "#{path} rule references missing provider: #{provider}" unless providers.include?(provider)
  end

  apple_proxy = rules.index("RULE-SET,AppleProxy,Apple服务")
  apple_direct = rules.index("RULE-SET,Apple,DIRECT")
  china_max = rules.index("RULE-SET,ChinaMaxNoIP,DIRECT")
  geosite_cn = rules.index("GEOSITE,CN,DIRECT")
  required_app_store_rules = %w[
    DOMAIN-SUFFIX,apps.apple.com,Apple服务
    DOMAIN-SUFFIX,apps-marketplace.apple.com,Apple服务
    DOMAIN-SUFFIX,appstore.com,Apple服务
    DOMAIN-SUFFIX,itunes.apple.com,Apple服务
    DOMAIN-SUFFIX,itunes.com,Apple服务
    DOMAIN-SUFFIX,mzstatic.com,Apple服务
    DOMAIN-SUFFIX,aaplimg.com,Apple服务
    DOMAIN,ppq.apple.com,Apple服务
  ]
  raise "#{path} missing AppleProxy App Store route" unless apple_proxy
  raise "#{path} missing Apple direct fallback" unless apple_direct
  required_app_store_rules.each do |rule|
    rule_index = rules.index(rule)
    raise "#{path} missing App Store route: #{rule}" unless rule_index
    raise "#{path} App Store route must be before broad China rules: #{rule}" unless china_max && geosite_cn && rule_index < china_max && rule_index < geosite_cn
  end
  raise "#{path} AppleProxy must be before Apple direct fallback" unless apple_proxy < apple_direct
  raise "#{path} AppleProxy must be before broad China rules" unless china_max && geosite_cn && apple_proxy < china_max && apple_proxy < geosite_cn

  fake_ip_filter = cfg.dig("dns", "fake-ip-filter") || []
  %w[+.apps.apple.com +.itunes.apple.com +.mzstatic.com +.cdn-apple.com +.aaplimg.com].each do |domain|
    raise "#{path} missing App Store fake-ip-filter entry: #{domain}" unless fake_ip_filter.include?(domain)
  end
end

cfg = YAML.load_file("mihomo/mihomo.yaml")
raise "mihomo/mihomo.yaml proxies must be an array" unless cfg["proxies"].is_a?(Array)
raise "missing NodeParam anchor template" unless cfg["NodeParam"].is_a?(Hash)
providers = cfg["proxy-providers"]
raise "proxy-providers must be a hash" unless providers.is_a?(Hash)
%w[机场一 机场二 机场三].each do |name|
  provider = providers[name]
  raise "missing proxy-providers.#{name}" unless provider.is_a?(Hash)
  raise "#{name} provider must use type: http" unless provider["type"] == "http"
  raise "#{name} url placeholder missing" unless provider["url"].to_s.include?("replace-with-your-subscription-url")
  raise "#{name} health-check missing" unless provider["health-check"].is_a?(Hash)
  raise "#{name} additional-prefix missing" unless provider.dig("override", "additional-prefix").to_s.start_with?("[#{name}]")
end
RUBY

echo "[3/6] public sensitivity scan"
if "$RG" -n --glob '!scripts/preflight-public.sh' "(psk=|ca-p12 = [A-Za-z0-9+/]{40,}|sub\\.store/download|/Users/[^/]+|iCloud~com~nssurge|Mobile Documents|http-api =|external-controller-access =|snell, *[0-9]+\\.[0-9]+\\.[0-9]+\\.[0-9]+)" README.md Rules surge shadowrocket quantumultx mihomo scripts; then
  echo "sensitive pattern found in public files" >&2
  exit 1
fi

echo "[4/6] private Emby rule guard"
if "$RG" -n "emby-meta|Emby/Jellyfin metadata" README.md Rules surge shadowrocket quantumultx mihomo; then
  echo "public Emby metadata reference found" >&2
  exit 1
fi
if [[ -e surge/rules/emby-meta.list ]]; then
  echo "surge/rules/emby-meta.list must stay private" >&2
  exit 1
fi

echo "[5/6] custom icon artifact guard"
if [[ -d icons ]] || compgen -G "scripts/generate-*policy*icon*.py" >/dev/null; then
  echo "custom policy icon artifact found" >&2
  exit 1
fi
if "$RG" -n --glob '!scripts/preflight-public.sh' "proxy-configs@main/.*/.*icon|junchan0412/proxy-configs.*/.*icon" README.md Rules surge shadowrocket quantumultx mihomo scripts; then
  echo "repo-hosted policy icon reference found" >&2
  exit 1
fi

echo "[6/6] required public rule files"
for path in \
  surge/rules/ai-major.list \
  surge/rules/pre-ai-infra.list \
  surge/rules/direct-cn.list \
  Rules/Surge/AI.txt \
  Rules/Surge/Pre-AI.txt \
  surge/modules/google-redirect.sgmodule \
  surge/modules/redirect-enhance.sgmodule \
  surge/modules/dns-mapping.sgmodule \
  quantumultx/quantumultx.conf \
  mihomo/mihomo.yaml \
  mihomo/mihomo-override.yaml \
  shadowrocket/shadowrocket.conf \
  surge/Surge.clean.conf; do
  [[ -s "$path" ]] || { echo "missing or empty: $path" >&2; exit 1; }
done

echo "preflight-ok"
