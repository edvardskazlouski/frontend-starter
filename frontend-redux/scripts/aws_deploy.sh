#!/bin/sh
source ./.env
if [ -z $S3_BUCKET_NAME ]
  then
    echo 'You must to pass S3 bucket name (see .env file)';
    exit 1;
fi
aws s3 sync ./build/ s3://$S3_BUCKET_NAME
