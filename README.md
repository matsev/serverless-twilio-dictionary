# Serverless Twilio Dictionary

A serverless dictionary completely hosted in a Twilio account. The application is hosted on [Twilio Functions](https://www.twilio.com/docs/runtime/functions) and the data is persisted using [Twilio Sync](https://www.twilio.com/sync). The project was created using the [Serverless Toolkit](https://www.twilio.com/docs/labs/serverless-toolkit).


## Prerequisites

- [Node.js](https://nodejs.org/en/) (see the [.nvmrc](.nvmrc) file for current version)
- A Twilio account at https://www.twilio.com


## Setup

1. Log in to your Twilio account 
2. [Buy a Twilio phone number](https://support.twilio.com/hc/en-us/articles/223135247-How-to-Search-for-and-Buy-a-Twilio-Phone-Number-from-Console), take not of the number. 
3. Rename the [.env.example](.env.example) file to just `.env`
4. Copy the values of `ACCOUNT_SID`, `AUTH_TOKEN` and the `TWILIO_NUMBER` to the `.env` file
5. **Important:** _do not add the `.env` file to version control because it contains your Twilio account credentials_  
6. Exeute the [./scripts/setup.sh](./scripts/setup.sh) script


## Local Development

Start the local development environment with live reloading of Functions

`npx twilio serverless:start`


## Deploy

`npx twilio-run deploy`


## CLI Tools

| Tool                          | Example                               | Reference |
| ----------------------------- | ------------------------------------- | --------- |
| Twilio CLI tool               | `npx twilio --help`                   | [twilio](https://www.twilio.com/docs/twilio-cli/quickstart) |
| Twilio Run CLI tool           | `npx twilio-run --help`               | [twilio-run](https://github.com/twilio-labs/serverless-toolkit/tree/main/packages/twilio-run#twilio-run) |
| Twilio Serverless CLI plugin  | `npx twilio-run serverless --cwd .`   | [plugin-serverless](https://github.com/twilio-labs/plugin-serverless#commands) | 
