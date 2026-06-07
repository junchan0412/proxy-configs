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

echo "[1/5] Surge template check"
"$SURGE_CLI" -c surge/Surge.clean.conf

echo "[2/5] Mihomo YAML check"
/usr/bin/ruby -e 'require "yaml"; YAML.load_file("mihomo/mihomo-override.yaml")'

echo "[3/5] public sensitivity scan"
if "$RG" -n "(psk=|ca-p12 = [A-Za-z0-9+/]{40,}|sub\\.store/download|/Users/qidewei|iCloud~com~nssurge|Mobile Documents|http-api =|external-controller-access =|155\\.117\\.18\\.27|213\\.35\\.108\\.139|82\\.152\\.161\\.6)" README.md surge shadowrocket mihomo; then
  echo "sensitive pattern found in public files" >&2
  exit 1
fi

echo "[4/5] private Emby rule guard"
if "$RG" -n "emby-meta|Emby/Jellyfin metadata" README.md surge shadowrocket mihomo; then
  echo "public Emby metadata reference found" >&2
  exit 1
fi
if [[ -e surge/rules/emby-meta.list ]]; then
  echo "surge/rules/emby-meta.list must stay private" >&2
  exit 1
fi

echo "[5/5] required public rule files"
for path in \
  surge/rules/ai-major.list \
  surge/rules/pre-ai-infra.list \
  surge/rules/direct-cn.list \
  mihomo/mihomo-override.yaml \
  shadowrocket/shadowrocket.conf \
  surge/Surge.clean.conf; do
  [[ -s "$path" ]] || { echo "missing or empty: $path" >&2; exit 1; }
done

echo "preflight-ok"
