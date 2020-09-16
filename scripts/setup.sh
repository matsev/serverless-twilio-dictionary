#!/usr/bin/env bash

#
# Deploy the Twilio stack. Heavily inspired by https://github.com/stefanjudis/twilio-serverless-sms-group-chat/blob/master/scripts/setup.sh
#

set -eu

SCRIPT_DIR="$( cd "$( dirname "$0" )" && pwd )"
ROOT_DIR="$( cd "${SCRIPT_DIR}/.." && pwd)"
FUNCTIONS_ENV="${ROOT_DIR}/.env"
TWILIO_ENV="${ROOT_DIR}/.env.twilio"
ENDPOINTS_ENV="${ROOT_DIR}/.env.endpoints"


SYNC_SERVICE_NAME="Serverless Dictionary"
SYNC_MAP_NAME="dictionary"


cd "${ROOT_DIR}" || exit
# shellcheck disable=SC1090
source "${TWILIO_ENV}"


# Create the Sync Service and the Sync Map
echo "Create Sync Service"
SYNC_SERVICE_SID=$(npx twilio api:sync:v1:services:create --friendly-name="${SYNC_SERVICE_NAME}" -o=json | jq -r '.[].sid')
SYNC_MAP_SID=$(npx twilio api:sync:v1:services:maps:create --service-sid="${SYNC_SERVICE_SID}" --unique-name="${SYNC_MAP_NAME}" -o=json| jq -r '.[].sid')

# Store Sync reference so that they are accessible to Twilio Functions
echo "SYNC_SERVICE_SID=${SYNC_SERVICE_SID}" > "${FUNCTIONS_ENV}"
echo "SYNC_MAP_SID=${SYNC_MAP_SID}" >> "${FUNCTIONS_ENV}"


# Deploy Twilio Functions
DEPLOY_OUTPUT=$(npx twilio serverless:deploy --force)
echo "${DEPLOY_OUTPUT}"
echo "${DEPLOY_OUTPUT}" > out.txt


# Save endpoints
SMS_ENDPOINT_URL=$(echo "${DEPLOY_OUTPUT}"  | grep -o "https://.*twil\.io/sms/reply")
WEB_ENDPOINT_URL=$(echo "${DEPLOY_OUTPUT}"  | grep -o "https://.*twil\.io/index\.html")

echo "export SMS_ENDPOINT_URL=${SMS_ENDPOINT_URL}" >> "${ENDPOINTS_ENV}"
echo "export WEB_ENDPOINT_URL=${WEB_ENDPOINT_URL}" >> "${ENDPOINTS_ENV}"


# Configure phone number with SMS endpoint
echo "Configure phone number"
npx twilio phone-numbers:update "${TWILIO_NUMBER}"  --sms-url="${SMS_ENDPOINT_URL}"

