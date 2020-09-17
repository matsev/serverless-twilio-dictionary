const assets = Runtime.getAssets();
const dictionaryAsset = assets['/dictionary.js'];
const dictionaryPath = dictionaryAsset.path;
const dictionary = require(dictionaryPath);

const { COMMAND_TABLE, read } = dictionary;


exports.handler = (context, event, callback) => {
  console.info('Received event:', JSON.stringify(event));
  const { Body } = event;
  const client = context.getTwilioClient();

  const [ command, key, ...definition ] = Body.split(' ');
  const func = COMMAND_TABLE[command.toUpperCase()];

  const promise = func
    ? func(client, key, definition.join(' '))
    // default to 'read' if there is no matching func. In that case, the 'key' is passed as the 'command'
    : read(client, command);

  promise
    .then(result => {
      console.info('result:', JSON.stringify(result));
      const { key, definition, msg } = result;

      const twiml = new Twilio.twiml.MessagingResponse();
      twiml.message(msg);
      callback(null, twiml);
    })
    .catch(err => {
      console.error(err);
      callback(err);
    });
};
