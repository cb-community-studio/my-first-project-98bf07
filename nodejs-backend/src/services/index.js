const users = require("./users/users.service.js");
const emails = require("./emails/emails.service.js");
const inventories = require("./inventories/inventories.service.js");
const payrolls = require("./payrolls/payrolls.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(emails);
  app.configure(inventories);
  app.configure(payrolls);
  // ~cb-add-configure-service-name~
};
