const { SYNC_SERVICE_SID, SYNC_MAP_SID } = process.env;

const STATUS_NOT_FOUND = 404;
const STATUS_CONFLICT = 409;

const HTTP_STATUS_MESSAGES = {
  [STATUS_NOT_FOUND]  : key => `${key} does not exist`,
  [STATUS_CONFLICT]   : key => `${key} already exists`,
};


const resolveHttMessage = (cmd, key) => {
  return (err) => {
    const { status } = err;
    const responseMessageFn = HTTP_STATUS_MESSAGES[status];

    if (responseMessageFn) {
      return Promise.resolve({
        key,
        msg: responseMessageFn(key),
      })
    } else {
      console.error(`${cmd} err:`, JSON.stringify(err));
      return Promise.reject(err);
    }
  }
};


const create = async (client, key, definition) => {
  console.info(`create: '${key}' => '${definition}'`);

  return client.sync
    .services(SYNC_SERVICE_SID)
    .syncMaps(SYNC_MAP_SID)
    .syncMapItems
    .create({
      key,
      data: {
        definition,
      },
    })
    .then(item => {
      console.info('created:', JSON.stringify(item));
      const { key, data: { definition } } = item;
      return {
        key,
        definition,
        msg: `Created: ${key} - ${definition}`,
      };
    })
    .catch(resolveHttMessage('create', key));
};


const read = async (client, key) => {
  console.info(`read: '${key}'`);
  return client.sync
    .services(SYNC_SERVICE_SID)
    .syncMaps(SYNC_MAP_SID)
    .syncMapItems(key)
    .fetch()
    .then(item => {
      console.info('read:', JSON.stringify(item));
      const { key, data: { definition } } = item;
      return {
        key,
        definition,
        msg: `Read: ${key} - ${definition}`,
      };
    })
    .catch(resolveHttMessage('read', key));
};


const update = async (client, key, definition) => {
  console.info(`update: '${key}' => '${definition}'`);
  return client.sync
    .services(SYNC_SERVICE_SID)
    .syncMaps(SYNC_MAP_SID)
    .syncMapItems(key)
    .update({
      data: {
        definition,
      },
    })
    .then(item => {
      console.info('updated:', JSON.stringify(item));
      const { key, data: { definition } } = item;
      return {
        key,
        definition,
        msg: `Updated: ${key} - ${definition}`,
      };
    })
    .catch(resolveHttMessage('update', key));
};


const del = async (client, key) => {
  console.info(`delete: '${key}'`);
  return client.sync
    .services(SYNC_SERVICE_SID)
    .syncMaps(SYNC_MAP_SID)
    .syncMapItems(key)
    .remove()
    .then(item => {
      console.info('deleted:', JSON.stringify(item));
      return {
        key,
        msg: `Deleted: ${key}`,
      };
    })
    .catch(resolveHttMessage('delete', key));
};


const COMMAND_TABLE = {
  C       : create,
  CREATE  : create,
  R       : read,
  READ    : read,
  U       : update,
  UPDATE  : update,
  D       : del,
  DELETE  : del,
};


module.exports = {
  create,
  read,
  update,
  del,
  COMMAND_TABLE,
};
