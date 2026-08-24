#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ "${SITES_ENV_READY:-}" != "1" ]]; then
  exec "${script_dir}/sites-env.sh" -- "$0" "$@"
fi

command -v timeout || {
  echo "build-verified.sh requires GNU timeout." >&2
  exit 69
}

vinext="${SITES_PROJECT_ROOT}/node_modules/.bin/vinext"
if [[ ! -x "${vinext}" ]]; then
  echo "vinext is unavailable. Run npm run install:ci and wait for it to finish before building." >&2
  exit 69
fi

echo "Running bounded vinext build..."
timeout \
  --signal=TERM \
  --kill-after="${SITES_BUILD_KILL_AFTER:-10s}" \
  "${SITES_BUILD_TIMEOUT:-3m}" \
  "${vinext}" build

# Cloudflare serves public assets reliably by stable names. Vinext emits the
# application stylesheet with a content hash, so also expose a stable fallback
# used by the root layout. This prevents an unstyled page when the deployment
# HTML and asset manifest are cached at different moments.
stylesheet="$(find "${SITES_PROJECT_ROOT}/dist/client/assets" -maxdepth 1 -type f -name '*.css' -print -quit)"
if [[ -z "${stylesheet}" ]]; then
  echo "No compiled stylesheet was produced." >&2
  exit 69
fi
cp "${stylesheet}" "${SITES_PROJECT_ROOT}/dist/client/styles.css"
