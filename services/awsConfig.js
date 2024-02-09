const { S3Client} = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");

dotenv.config()

const bucketRegion = process.env.BUCKET_REGION
const bucketName = process.env.BUCKET_NAME
const accessId = process.env.AWS_ACCESS_KEY_ID
const accessSecreteKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3Client({
  accessKeyId: accessId,
  secretAccessKey: accessSecreteKey,
  region: bucketRegion,
})

modeule.exports={
    s3:s3
}