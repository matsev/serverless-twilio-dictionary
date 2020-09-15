#!/usr/bin/env bash

#
# Deploy the Twilio stack. Heavily inspired by https://github.com/stefanjudis/twilio-serverless-sms-group-chat/blob/master/scripts/setup.sh
#

set -eu

SCRIPT_DIR="$( cd "$( dirname "$0" )" && pwd )"
ROOT_DIR="$( cd "${SCRIPT_DIR}/.." && pwd)"

SYNC_SERVICE_NAME="Serverless Dictionary"
SYNC_MAP_NAME="dictionary"


cd "${ROOT_DIR}" || exit
source .env


# install dependencies
npm install


# Create Sync Service
SYNC_SERVICE_SID=$(npx twilio api:sync:v1:services:create --friendly-name="${SYNC_SERVICE_NAME}" -o=json | jq -r '.[].sid')

echo "Sync Service Sid: ${SYNC_SERVICE_SID}"

# Create "dictionary" map
SYNC_MAP_SID=$(npx twilio api:sync:v1:services:maps:create --service-sid="${SYNC_SERVICE_SID}" --unique-name="${SYNC_MAP_NAME}" -o=json| jq -r '.[].sid')

echo "Sync Map Sid: ${SYNC_MAP_SID}"

echo "SYNC_SERVICE_SID=${SYNC_SERVICE_SID}" >> .env
echo "SYNC_MAP_SID=${SYNC_MAP_SID}" >> .env


# Deploy Twilio Functions
DEPLOY_OUTPUT=$(npx twilio serverless:deploy --force)
echo "${DEPLOY_OUTPUT}"

SMS_ENDPOINT_URL=$(echo "${DEPLOY_OUTPUT}" | grep -o "https://.*/sms/reply")
WEB_ENDPOINT_URL=$(echo "${DEPLOY_OUTPUT}" | grep -o "https://.*/index.html")

# Update SMS endpoint
npx twilio phone-numbers:update "${TWILIO_NUMBER}"  --sms-url="${SMS_ENDPOINT_URL}"

echo "SMS endpoint: ${SMS_ENDPOINT_URL}"
echo "Web endpoint: ${WEB_ENDPOINT_URL}"
