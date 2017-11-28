import AWS from 'aws-sdk';

import config from 'constants/aws';

AWS.config.update({
  region: config.AWS_REGION,
  credentials: new AWS.Credentials({
    accessKeyId: config.AWSAccessKeyId,
    secretAccessKey: config.AWSSecretKey,
  }),
});

const s3 = new AWS.S3({
  params: {
    Bucket: config.bucket,
  },
});

export const uploadFileToAWS = (file, name) => {
  return new Promise((res, rej) => {
    s3.upload(
      {
        Key: name,
        Body: file,
      },
      err => {
        if (err) {
          rej(err);
        } else {
          res();
        }
      },
    );
  });
};
