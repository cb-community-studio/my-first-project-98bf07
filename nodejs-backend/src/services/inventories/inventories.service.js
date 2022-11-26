const { Inventories } = require('./inventories.class');
const createModel = require('../../models/inventories.model');
const hooks = require('./inventories.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/inventories', new Inventories(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('inventories');

  service.hooks(hooks);
};