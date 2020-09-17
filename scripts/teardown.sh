#!/usr/bin/env bash

#
# Teardown the Twilio stack
#

set -eu

SCRIPT_DIR="$( cd "$( dirname "$0" )" && pwd )"
ROOT_DIR="$( cd "${SCRIPT_DIR}/.." && pwd)"
TWILIO_ENV="${ROOT_DIR}/.env.twilio"
TWILIO_FUNCTIONS="${ROOT_DIR}/.twilio-functions"
FUNCTIONS_ENV="${ROOT_DIR}/.env"
ENDPOINTS_ENV="${ROOT_DIR}/.env.endpoints"


cd "${ROOT_DIR}" || exit

# shellcheck disable=SC1090
source "${TWILIO_ENV}"


# Remove phone number from SMS endpoint
echo "Reset phone number"
npx twilio phone-numbers:update "${TWILIO_NUMBER}"  --sms-url="https://demo.twilio.com/welcome/sms/" > /dev/null

# Remove Serverless
if [ -f "${TWILIO_FUNCTIONS}" ]; then
    echo "Remove Serverless Service"

    SERVERLESS_SID=$(jq -r '.serviceSid' < "${TWILIO_FUNCTIONS}")
    npx twilio api:serverless:v1:services:remove --sid="${SERVERLESS_SID}"

    rm -f "${TWILIO_FUNCTIONS}"
    rm -f "${ENDPOINTS_ENV}"
fi

# Remove Sync Service
if [ -f "${FUNCTIONS_ENV}" ]; then
    echo "Remove Sync Service"

    SYNC_SERVICE_SID=$(sed -n 's/SYNC_SERVICE_SID=\(.*\)/\1/p' "${FUNCTIONS_ENV}")
    npx twilio api:sync:v1:services:remove --sid="${SYNC_SERVICE_SID}"

    rm -f "${FUNCTIONS_ENV}"
fi
