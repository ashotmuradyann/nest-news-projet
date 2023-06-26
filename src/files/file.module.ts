import { Module } from '@nestjs/common';
import { FileService } from "./files.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilesEntity } from "./files.entity";
import { FilesController } from "./files.controller";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { FileUtil } from "../../utils/file.util";

@Module({
  imports: [
    TypeOrmModule.forFeature([FilesEntity]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploaded/images',
        filename: (req, file, callback) => {
          let fileName = FileUtil.updateFileName(file.originalname.toLowerCase())

          callback(null, fileName);
        },
      }),
    }),
  ],
  providers: [FileService],
  controllers: [FilesController],
  exports: [FileService]
})
export class FilesModule {}
