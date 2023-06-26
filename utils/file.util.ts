import * as fs from "fs"
import * as path from "path"
import { NotFoundException } from "@nestjs/common";

export class FileUtil{
  static checkFileExist(file: string): boolean{
    const filePath = path.resolve("uploaded", "images", file)

    return fs.existsSync(filePath)
  }

  static removeFile(file: string): void{
    if(!FileUtil.checkFileExist(file)){
      throw new NotFoundException(`file whit ${file} this id not found`)
    }
    fs.unlinkSync(path.resolve("uploaded", "images", file))
  }

  static updateFileName(file: string): string{
    if(!FileUtil.checkFileExist(file)){
      return file
    }
    let fileArray = file.split(".")
    if(/-[0-9]+$/.test(fileArray.at(-2))){
      let nameArray = fileArray.at(-2).split("-")
      nameArray[nameArray.length - 1] = String(Number(nameArray.at(-1)) + 1)
      fileArray[fileArray.length - 2] = nameArray.join("-")
      file = fileArray.join(".")
    } else {
      fileArray[fileArray.length - 2] = fileArray.at(-2) + "-1"
      file = fileArray.join(".")
    }
    return FileUtil.updateFileName(file)
  }
}