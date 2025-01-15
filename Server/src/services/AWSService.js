import AWS from "aws-sdk";

export class AWSService {
    constructor() {
        this.s3 = new AWS.S3();
    }

    // Generate a unique version ID
    generateVersionId() {
        return `v${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // Upload to S3 with versioning
    async uploadToS3(file, userId, projectId, filename) {
        try {
            const versionId = this.generateVersionId();
            const s3Key = `users/${userId}/projects/${projectId}/${versionId}/${filename}`;

            const params = {
                Body: file,
                Bucket: process.env.AWS_BUCKET,
                Key: s3Key,
                ContentType: file.mimetype,
                Metadata: {
                    userId,
                    projectId,
                    versionId,
                    originalName: filename
                }
            };

            const uploadResult = await this.s3.upload(params).promise();

            return {
                s3Key,
                versionId,
                location: uploadResult.Location
            };
        } catch (error) {
            console.error(`Failed to upload ${filename} to S3:`, error);
            throw new Error("Failed to upload to S3: " + error.message);
        }
    }

    // List all versions of a file
    async listFileVersions(userId, projectId, filename) {
        try {
            const prefix = `users/${userId}/projects/${projectId}/`;

            const params = {
                Bucket: process.env.AWS_BUCKET,
                Prefix: prefix
            };

            const data = await this.s3.listObjectsV2(params).promise();

            // Filter objects by filename and extract version information
            const versions = data.Contents
                .filter(item => item.Key.endsWith(filename))
                .map(item => {
                    const versionId = item.Key.split('/')[4]; // Extract version ID from path
                    return {
                        versionId,
                        lastModified: item.LastModified,
                        size: item.Size,
                        key: item.Key
                    };
                })
                .sort((a, b) => b.lastModified - a.lastModified); // Sort by date, newest first

            return versions;
        } catch (error) {
            console.error(`Failed to list versions for ${filename}:`, error);
            throw new Error("Failed to list file versions: " + error.message);
        }
    }

    // Fetch specific version of a file
    async fetchVersionFromS3(s3Key) {
        try {
            const params = {
                Bucket: process.env.AWS_BUCKET,
                Key: s3Key
            };

            const data = await this.s3.getObject(params).promise();
            return {
                content: data.Body,
                metadata: data.Metadata
            };
        } catch (error) {
            console.error(`Failed to download version ${s3Key}:`, error);
            throw new Error("Failed to download version: " + error.message);
        }
    }
}