import { promises as fs } from "fs";
import formidable, { File } from 'formidable';
import path from "path";

export const config = {
    api: {
        bodyParser: false,
        sizeLimit: '10mb',
    }
};

const upload = async (req, res) => {
    const folder =  req.query.folder;  
    let status = 200;
    let resultBodyFiles = [];  
    const files = await new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        const files = [];
        form.on('file', function (field, file) {
            files.push([field, file]);
        })
        form.on('end', () => resolve(files));
        form.on('error', err => reject(err));
        form.parse(req, () => {
        });
    }).catch(e => {        
        status = 500;
        resultBody = {
            status: 'fail', message: 'Upload error'
        }
        return(e);
    });
    if (files?.length) {
        const targetPath = path.join(process.cwd(), `/public/upload/${folder}/`);
        try {
            await fs.access(targetPath);
        } catch (e) {
            await fs.mkdir(targetPath);
        }
        for (const file of files) {
            const tempPath = file[1].filepath;
            await fs.copyFile(tempPath, targetPath + file[1].originalFilename);            
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random());
            const fileName = `${uniqueSuffix}-${file[1].originalFilename}`;  
            resultBodyFiles.push(fileName);
            fs.rename( `${targetPath}${file[1].originalFilename}`, `${targetPath}${fileName}`).then(() => {                
            }).catch((err) => {
                 return(err);
            });       
         }
    }
    return res.status(status).json(resultBodyFiles);
}
export default upload;