const { SYNC_SERVICE_SID, SYNC_MAP_SID } = process.env;


const doesNotExist = (key, err) => {
  const { status } = err;
  return status === 404
    ? Promise.resolve({
      key,
      msg: `${key} does not exist`,
    })
    : Promise.reject(err);
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
    .catch(err => {
      console.info('created err:', JSON.stringify(err));
      return Promise.reject(err);
    });
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
    .catch(err => {
      console.error('read err:', JSON.stringify(err));
      return doesNotExist(key, err);
    });
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
    .catch(err => {
      console.error('updated err:', JSON.stringify(err));
      return doesNotExist(key, err);
    });
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
    .catch(err => {
      console.error('deleted err:', JSON.stringify(err));
      return doesNotExist(key, err);
    });
};


const COMMAND_TABLE = {
  C:      create,
  CREATE: create,
  R:      read,
  READ:   read,
  U:      update,
  UPDATE: update,
  D:      del,
  DELETE: del,
};


module.exports = {
  create,
  read,
  update,
  del,
  COMMAND_TABLE,
};
