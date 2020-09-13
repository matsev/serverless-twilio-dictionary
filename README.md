# Serverless Twilio Dictionary

A serverless dictionary completely hosted in a Twilio account. The application is hosted on [Twilio Functions](https://www.twilio.com/docs/runtime/functions) and the data is persisted using [Twilio Sync](https://www.twilio.com/sync). The project was created using the [Serverless Toolkit](https://www.twilio.com/docs/labs/serverless-toolkit).


## Prerequisites

- [Node.js](https://nodejs.org/en/) (see the [.nvmrc](.nvmrc) file for current version)
- A Twilio account at https://www.twilio.com


## Twilio Account Configuration

1. Log in to your Twilio account 
2. Rename the [.env.example](.env.example) file to just `.env`
3. Copy the values of `ACCOUNT_SID` and `AUTH_TOKEN` to the `.env`file
4. **Important:** _do not add the `.env` file to version control because it enables access to your Twilio account_  


## Deploy

`npx twilio-run deploy`


## CLI Tools

| Tool                          | Example                               | Reference |
| ----------------------------- | ------------------------------------- | --------- |
| Twilio CLI tool               | `npx twilio-run --help`               | [twilio-run](https://github.com/twilio-labs/serverless-toolkit/tree/main/packages/twilio-run#twilio-run) |
| Twilio Serverless CLI plugin  | `npx twilio-run serverless --cwd .`   | [plugin-serverless](https://github.com/twilio-labs/plugin-serverless#commands) | 
