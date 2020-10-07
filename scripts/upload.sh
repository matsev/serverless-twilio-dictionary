#!/usr/bin/env bash

#
# Posts messages to the Twilio
#

set -e

SCRIPT_DIR="$( cd "$( dirname "$0" )" && pwd )"
ROOT_DIR="$( cd "${SCRIPT_DIR}/.." && pwd)"
ENDPOINTS_ENV="${ROOT_DIR}/.env.endpoints"
DICTIONARY_CSV="${SCRIPT_DIR}/dictionary.csv"

# shellcheck disable=SC1090
source "${ENDPOINTS_ENV}"

OLD_IFS="$IFS"

while IFS=, read -r key meaning || [[ -n "${key}" ]]; do
    curl -XPOST -s -d "command=c&key=${key}&definition=${meaning}" "${API_ENDPOINT}" > /dev/null &
done < "${DICTIONARY_CSV}"

IFS="${OLD_IFS}"

wait
