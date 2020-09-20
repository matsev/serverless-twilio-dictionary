const { TWILIO_NUMBER } = process.env;

exports.handler = (context, event, callback) => {
  console.info('Received event:', JSON.stringify(event));

  const client = context.getTwilioClient();
  client.lookups.phoneNumbers(TWILIO_NUMBER)
    .fetch()
    .then(phoneNumberData => {
        console.info('Phone number:', JSON.stringify(phoneNumberData));
        const { countryCode, phoneNumber, nationalFormat } = phoneNumberData;
        callback(null, { countryCode, phoneNumber, nationalFormat });
      }
    )
    .catch(err => {
      console.error('Phone number error', JSON.stringify(err));
    });
};
