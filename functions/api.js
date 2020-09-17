const assets = Runtime.getAssets();
const dictionaryAsset = assets['/dictionary.js'];
const dictionaryPath = dictionaryAsset.path;
const dictionary = require(dictionaryPath);

const { COMMAND_TABLE, read } = dictionary;

exports.handler = (context, event, callback) => {
  console.info('Received event:', JSON.stringify(event));
  const client = context.getTwilioClient();

  const { command, key, definition } = event;
  const func = COMMAND_TABLE[command.toUpperCase()];

  const promise = func
    ? func(client, key, definition)
    // default to 'read' if there is no matching func. In that case, the 'key' is passed as the 'command'
    : read(client, command);

  promise
    .then(result => {
      console.info('result:', JSON.stringify(result));
      callback(null, result);
    })
    .catch(err => {
      console.error(err);
      callback(err);
    });
};
