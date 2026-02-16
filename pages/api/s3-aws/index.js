import {S3Client, PutObjectCommand, GetObjectCommand, CreateBucketCommand, DeleteObjectCommand, DeleteBucketCommand, paginateListObjectsV2, ListObjectsV2Command} from "@aws-sdk/client-s3";
import KeyRandome from '../../services/key_randome';

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
}

export default async function (req, res) {    

    KeyRandome(8);
    const extension = KeyRandome(8);
    const timestamp = Date.now(); 
    const uniqueName = `${timestamp}${extension}`;
    const s3Client = new S3Client({
        region: process.env.S3_YANDEX_REGION,
        endpoint: process.env.S3_YANDEX_END_POINT,
        credentials: {
            secretAccessKey: process.env.S3_YANDEX_SECRET_KEY,
            accessKeyId: process.env.S3_YANDEX_ID_KEY
        }
    }); 
    if (req.method === "POST") {
        try {
            const dataUrl = req.body;
            const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');        

            // Отправка объектов (картинок) в бакет яндекса
            await s3Client.send(
                new PutObjectCommand({
                    Bucket: process.env.S3_YANDEX_BUCKET,
                    Key: uniqueName,
                    Body: buffer,
                    ContentType: 'image/png'
                }),
            );

            //Получить объект
            await s3Client.send(
                new GetObjectCommand({
                    Bucket: process.env.S3_YANDEX_BUCKET,
                    Key: uniqueName
                }),
            );                
     
            return res.status(200).json(`${uniqueName}`);
            }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    if (req.method === "DELETE") {
        try {
            const deleteCommand = new DeleteObjectCommand({
              Bucket: process.env.S3_YANDEX_BUCKET,
              Key:"!!!",
            });        
            await s3Client.send(deleteCommand);        
            res.status(200).json({ message: 'Объект успешно удален' });
        } 
        catch (error) {
            console.error('Ошибка при удалении объекта:', error);
            res.status(500).json({ message: 'Ошибка при удалении объекта', error: error.message });
        }
    }
}
