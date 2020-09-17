#!/usr/bin/env bash

#
# Posts messages to the Twilio
#

set -e

SCRIPT_DIR="$( cd "$( dirname "$0" )" && pwd )"
ROOT_DIR="$( cd "${SCRIPT_DIR}/.." && pwd)"
ENDPOINTS_ENV="${ROOT_DIR}/.env.endpoints"

# shellcheck disable=SC1090
source "${ENDPOINTS_ENV}"


curl -XPOST -d "command=${1}&key=${2}&definition=${3}" "${API_ENDPOINT}"
