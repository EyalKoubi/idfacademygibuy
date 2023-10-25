import * as Minio from "minio";
export const s3Config = {
    endPoint: "127.0.0.1",
    port: 9000,
    accessKey: "AKIAIOSFODNN7EXAMPLE",
    secretKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    useSSL: false,
  };
export const s3Client = new Minio.Client(s3Config);

export async function uploadFileToS3Service(
    file: File | null,
    buffer: Buffer,
    bucket: string
  ) {
    const objectName: any = file?.name;
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