import * as Minio from "minio";
export const s3Config = {
    endPoint: "127.0.0.1",
    port: 9000,
    accessKey: "AKIAIOSFODNN7EXAMPLE",
    secretKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    useSSL: false,
  };
export const bucket: string = "bucket1"; // Specify the name of your MinIO bucket
export const s3Client = new Minio.Client(s3Config);

export async function uploadFileToS3Service(
    file: File | null,
    buffer: Buffer,
    bucket: string,
    fileid:string
  ) {
    const objectName: any = fileid;
    const objectSize = file?.size;
  
    await new Promise((resolve, reject) => {
      s3Client.putObject(
        bucket,
        objectName,
        buffer,
        objectSize,
        (err: any, etag: unknown) => {
          if (err) {
            console.error("Error uploading to Minio:", err);
            reject(err);
          } else {
            resolve(etag);
          }
        }
      );
    });
  }
  export async function getFileFromS3Service(bucket: string, fileName: string): Promise<string> {
    try {
      const stream = await s3Client.getObject(bucket, fileName);
      const chunks: Buffer[] = [];
  
      return new Promise((resolve, reject) => {
        stream.on('data', (chunk: Buffer) => chunks.push(chunk));
        stream.on('end', () => {
          const buffer = Buffer.concat(chunks);
          const base64 = buffer.toString('base64');
          resolve(base64);
        });
        stream.on('error', reject);
      });
    } catch (error) {
      console.error('Error fetching file from S3:', error);
      console.log("fail in the getObject func")
      throw error;
    }
  }

    
    