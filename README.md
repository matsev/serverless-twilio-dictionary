# Serverless Twilio Dictionary

A serverless dictionary completely hosted in a Twilio account. The application is hosted on [Twilio Functions](https://www.twilio.com/docs/runtime/functions) and the data is persisted using [Twilio Sync](https://www.twilio.com/sync). The project was created using the [Serverless Toolkit](https://www.twilio.com/docs/labs/serverless-toolkit).


## Prerequisites

- [Node.js](https://nodejs.org/en/) (see the [.nvmrc](.nvmrc) file for current version)
- A Twilio account at https://www.twilio.com
- [jq](https://stedolan.github.io/jq/)


## Setup

1. Install npm dependencies
    
    ```bash
    npm install
    ```
2. Install the `@twilio-labs/plugin-serverless` plugin

    ```bash
    npx twilio plugins:install @twilio-labs/plugin-serverless
    ```
3. Log in to your Twilio account 
4. [Buy a Twilio phone number](https://support.twilio.com/hc/en-us/articles/223135247-How-to-Search-for-and-Buy-a-Twilio-Phone-Number-from-Console), take note of the number. 
5. Rename the [.env.twilio.example](.env.twilio.example) file to just `.env.twilio`
6. Copy the values of `ACCOUNT_SID`, `AUTH_TOKEN` and the `TWILIO_NUMBER` (i.e. the phone number that you bought earlier) to the `.env.twilio` file
7. **Important:** _do not add the `.env.twilio` file to version control because it contains your Twilio account credentials_  
8. Execute the [./scripts/setup.sh](./scripts/setup.sh) script

After the initial deployment you can execute the following command to update your function: 
```bash
npx twilio-run deploy
``` 


## Usage

After installation, you can interact with the dictionary by sending SMS CRUD (create, read update and delete) commands to you Twilio phone number:

> [command] key [definition]

- There are four commands (see list below). You can use either the full command or just a single character abbreviation. If omitted, the command defaults to `read`. 
- The `key` is the dictionary entry and one must be provided with all dictionary interactions. 
- The `definition` part is used when creating or updating the meaning of different words. 

| Command   | Abbreviation  | Comment                                           |
| --------- | ------------- | ------------------------------------------------- |
| `create`  | `c`           | Creates a new entry in the dictionary             | 
| `read`    | `r`           | Reads an entry from dictionary (default command)  | 
| `update`  | `u`           | Updates a dictionary entry                        |
| `delete`  | `d`           | Deletes a dictionary entry                        |


Examples:

> create TLA Three Letter Acronym

Adds the entry `TLA` with the definition `Three Letter Acronym` to the dictionary

> read TLA

or just 

> TLA 

reads the value of the `TLA` entry.

For convenience, the service also has a public API endpoint and you can use the [./scripts/post.sh](./scripts/post.sh) script and the same command syntax as above to send commands, e.g.

>  ./scripts/post.sh delete TLA


## Clean up

Execute the [./scripts/teardown.sh](./scripts/teardown.sh) script


## References

### Developer Resources Online 

- [Function and Assets API](https://www.twilio.com/docs/runtime)
- [Services API](https://www.twilio.com/docs/runtime/functions-assets-api/api/service)
- [SYNC API, Map Item](https://www.twilio.com/docs/sync/api/map-item-resource)

### CLI Tools

| Tool                          | Example                               | Reference |
| ----------------------------- | ------------------------------------- | --------- |
| Twilio CLI tool               | `npx twilio --help`                   | [twilio](https://www.twilio.com/docs/twilio-cli/quickstart) |
| Twilio Run CLI tool           | `npx twilio-run --help`               | [twilio-run](https://github.com/twilio-labs/serverless-toolkit/tree/main/packages/twilio-run#twilio-run) |
| Twilio Serverless CLI plugin  | `npx twilio-run serverless --cwd .`   | [plugin-serverless](https://github.com/twilio-labs/plugin-serverless#commands) | 


## Acknowledgements

Thanks to Stefan Judis for support. Please also see his [GitHub](https://github.com/stefanjudis/twilio-serverless-sms-group-chat) repo for a demo implementation of s Twilio SMS Serverless group chat.
