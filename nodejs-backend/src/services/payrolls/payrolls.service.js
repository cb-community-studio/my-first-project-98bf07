const { Payrolls } = require('./payrolls.class');
const createModel = require('../../models/payrolls.model');
const hooks = require('./payrolls.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/payrolls', new Payrolls(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('payrolls');

  service.hooks(hooks);
};