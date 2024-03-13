const { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require("dotenv").config();


const s3Client = new S3Client({
    region: process.env.REGION || "us-west-2",
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID || "YOUR-ACCESS-KEY",
        secretAccessKey: process.env.SECRET_KEY || "YOUR-SECRET-KEY"
    }
});

const getObjectFromS3 = async (key) => {
    const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET || "YOUR-S3-BUCKET",
        
        Key: key,
    });
    const url = await getSignedUrl(s3Client, command, { expiresIn: 30 });
    return url;
};

const putObjectOnS3 = async (fileName, contentType) => {
    const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET || "YOUR-S3-BUCKET",
        Key: `uploads/users/${fileName}`,
        ContentType: contentType
    });

    const url = await getSignedUrl(s3Client, command);
    return url;
}

const listObject = async () => {
    const command = new ListObjectsV2Command({
        Bucket: process.env.S3_BUCKET || "YOUR-S3-BUCKET",
        Key: `/`,
    })

    const result = await s3Client.send(command);
    console.log("result----------", result);
    // return result;
}

const deleteObject = async (key) => {
    const command = new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET || "YOUR-S3-BUCKET",
        Key: key,
    });

    const deletedData = await s3Client.send(command);
    console.log("deletedData----------", deletedData);

}
const init = async () => {
    // console.log("URL for the image from S3 bucket------------", await getObjectFromS3("myImage"));
    // console.log("URL for the image from S3 bucket------------", await getObjectFromS3("uploads/users/image-1710249674276.png"));
    // console.log("URL for upload the image on S3 bucket------------", await putObjectOnS3(`image-${Date.now()}.png`), "image/png");
    await listObject();
    // await deleteObject("uploads/users/image-1710311337511.png");
}

init();


