import AWS from "aws-sdk";

export class AWSService {
    constructor() {
        this.s3 = new AWS.S3();
    }

    // Upload to S3
    async uploadToS3(file, s3Key) {
        try {
            const params = {
                Body: file,
                Bucket: process.env.AWS_BUCKET,
                Key: s3Key,
                ContentType: file.mimetype,
            };

            await this.s3.upload(params).promise();
        } catch (error) {
            console.error(`Failed to upload ${s3Key} to S3: ${error}`);
            throw new Error("Failed to upload to S3: " + error.message);
        }
    }

    // Function to fetch file from S3
    async fetchFromS3(fileName) {
        try {
            const params = {
                Bucket: process.env.AWS_BUCKET,
                Key: fileName,
            };

            const data = await this.s3.getObject(params).promise();
            return data.Body; // Return the file content
        } catch (error) {
            console.error(`Failed to download ${fileName} from S3: ${error}`);
            throw new Error("Failed to download from S3: " + error.message);
        }
    }
}