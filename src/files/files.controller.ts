import {
  Controller, Delete,
  Get, HttpCode, HttpStatus, NotFoundException, Param, ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { FileService } from './files.service';
import { FileInterceptor } from "@nestjs/platform-express";

import { imageTypesEnum } from "../../utils/enums";
import { FileUtil } from "../../utils/file.util";
import { UuidInput } from "../validation/uuid.schema";
const imageTypes = new RegExp(`(${Object.values(imageTypesEnum).join("|")})$`, "g")

@Controller("files")
export class FilesController {
  constructor(private readonly filesService: FileService) {}

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(@UploadedFile(
    new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: imageTypes,
      })
      .addMaxSizeValidator({
        maxSize: 100 * 1024 * 1024
      })
      .build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
      })
  ) file: Express.Multer.File)
  {
    let payload = {
      path: "/" + file.filename,
      size: file.size,
      name: file.filename
    }
    return await this.filesService.createFile(payload)
  }

  @Get()
  async getFiles() {
    return await this.filesService.getFiles()
  }

  @Get(":id")
  async getOneFile(@Param() args: UuidInput){
    let file = await this.filesService.getFileById(args.id)
    if(!file){
      throw new NotFoundException(`file whit ${args.id} this id not found`)
    }
    return file
  }

  @Delete(":id")
  @HttpCode(204)
  async removeFile(@Param() args: UuidInput){
    let file = await this.getOneFile(args);
    FileUtil.removeFile(file.name)
    await this.filesService.removeFile(args.id)
    return
  }
}