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

  rules = cfg.fetch("rules", [])
  apple_proxy = rules.index("RULE-SET,AppleProxy,Apple服务")
  apple_direct = rules.index("RULE-SET,Apple,DIRECT")
  raise "#{path} missing AppleProxy App Store route" unless apple_proxy
  raise "#{path} missing Apple direct fallback" unless apple_direct
  raise "#{path} AppleProxy must be before Apple direct fallback" unless apple_proxy < apple_direct
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
