const AWS = require("aws-sdk");
const { meliLogger } = require("./logger");

AWS.config.update({
  region: "us-east-2",
  accessKeyId: process.env.S3_ID,
  secretAccessKey: process.env.S3_SECRET,
});

const sqs = new AWS.SQS({ apiVersion: "latest" });

const sendDataToNotificationQueue = async (data) => {
  const { user_id, resource, topic } = data;
  try {
    const params = {
      MessageAttributes: {
        user_id: {
          DataType: "String",
          StringValue: `${user_id}`,
        },
        resource: {
          DataType: "String",
          StringValue: resource,
        },
        topic: {
          DataType: "String",
          StringValue: topic,
        },
      },
      MessageBody: JSON.stringify({
        user_id,
        resource,
        topic,
      }),
      QueueUrl: process.env.AWS_QUEUE_URL,
    };
    const data = await sqs.sendMessage(params).promise();
    return data;
  } catch (error) {
    meliLogger.error("meliAddShipping", error);
  }
};

module.exports = { sendDataToNotificationQueue };
