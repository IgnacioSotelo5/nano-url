import { BadRequestException, Injectable } from "@nestjs/common";
import { FileInterceptor as MulterInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

@Injectable()
export class FileInterceptor{
    static createFileInterceptor(fieldName: string, destinationPath: string){
        return MulterInterceptor(fieldName, {
            storage: diskStorage({
                destination: destinationPath,
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname)
                    const filename = `photo-${uniqueSuffix}${ext}`
                    callback(null, filename)
                },
            }),
            fileFilter: (req, file, callback) => {
                const allowedTypes = /jpg|jpeg|png|jfiff/
                const ext = extname(file.originalname).toLowerCase()
                const mimeType = allowedTypes.test(file.mimetype)
                const extName = allowedTypes.test(ext)
                if(mimeType && extName){
                    return callback(null, true)
                }else{
                    callback(
                        new BadRequestException('Only image files are allowed.'),
                        null
                    )
                }
            },
            limits: {
                fileSize: 4 * 1024 * 1024
            }
        })
    }
}