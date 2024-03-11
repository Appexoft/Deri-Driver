/* eslint-disable no-undef */
const AWS = require("aws-sdk");
const fs = require("fs");

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ID,
  secretAccessKey: process.env.S3_SECRET,
});

const uploadImageToS3 = async (req, res, next) => {
  try {
    const promises = [];
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];

      const { path, originalname } = file;

      const fileContent = fs.readFileSync(path);

      promises.push(uploadLoadToS3(fileContent, originalname));
    }

    Promise.all(promises)
      .then(function (data) {
        req.newFiles = data;
        req.deletedFiles =
          req.body.deletedFiles && JSON.parse(req.body.deletedFiles);
        return next();
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  } catch (error) {
    res.status(500).send(error);
  }
};

const uploadLoadToS3 = (ObjFile, originalname) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: originalname,
    Body: ObjFile,
    ContentType: ObjFile.mimetype,
  };

  return s3.upload(params).promise();
};

module.exports = uploadImageToS3;
