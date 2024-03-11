const Queue = require("bull");

const notificationsQueue = new Queue(
  "Meli Notifications Queue",
  // eslint-disable-next-line no-undef
  process.env.REDIS_URL,
  {}
);
// eslint-disable-next-line no-undef
notificationsQueue.process(__dirname + "/notificationProcessor.js");

function addNotificationJob(data) {
  notificationsQueue.add(
    { data },
    { removeOnComplete: true, removeOnFail: true }
  );
}

module.exports = {
  addNotificationJob,
};
