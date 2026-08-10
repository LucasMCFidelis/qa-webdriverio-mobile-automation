#!/usr/bin/env bash
# scripts/run-tests.sh
#
# Executa a suíte de smoke primeiro (fail-fast) e, se passar, roda o
# restante dos cenários filtrados pelas tags recebidas via argumento.
#
# Uso:
#   ./scripts/run-tests.sh                 # roda smoke, depois tudo exceto smoke
#   ./scripts/run-tests.sh "@criacao"      # roda smoke, depois (@criacao) and not @smoke
set -e

adb wait-for-device

echo "== Rodando suíte de smoke =="
npm run wdio -- --cucumberOpts.tags="@smoke"

TAGS="${1:-}"
if [ -z "$TAGS" ]; then
  EXPR="not @smoke"
else
  EXPR="($TAGS) and not @smoke"
fi

echo "== Rodando suíte completa (tags: $EXPR) =="
npm run wdio -- --cucumberOpts.tags="$EXPR"