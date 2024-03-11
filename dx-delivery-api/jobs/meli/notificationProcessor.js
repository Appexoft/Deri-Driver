const { meliAddShipping } = require("../../controllers/meli.controller");
const { meliLogger } = require("../../helpers/logger");

module.exports = async function (job, done) {
  const { topic, user_id, resource } = job.data.data;
  try {
    switch (topic) {
      case "orders_v2":
        // eslint-disable-next-line no-case-declarations

        /*
            {
            topic: 'orders_v2',
            resource: '/orders/4783056510',
            user_id: 790010558,
            application_id: 8776188616553315,
            sent: '2021-08-11T17:51:25.297Z',
            attempts: 2,
            received: '2021-08-11T17:50:25.062Z'
            }
            */

        break;
      case "shipments":
        if (await meliAddShipping(user_id, resource)) {
          done();
        }
        break;
      default:
        meliLogger.warn("notificationProcessor", `unrecognized topic ${topic}`);
    }
    done();
  } catch (ex) {
    meliLogger.error("notificationProcessor", ex);
    throw ex;
  }
};
