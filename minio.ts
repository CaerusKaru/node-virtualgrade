import * as Minio from 'minio';

export const minioClient = new Minio.Client({
  endPoint: process.env.MIN_HOST,
  port: 9000,
  secure: true,
  accessKey: process.env.MIN_ACCESS,
  secretKey: process.env.MIN_SECRET
});
