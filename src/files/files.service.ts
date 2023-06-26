import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { FilesEntity } from "./files.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class FileService{
  constructor(
    @InjectRepository(FilesEntity)
    private readonly filesRepository: Repository<FilesEntity>
  ) {}

  async createFile(fileCreateInput){
    return this.filesRepository.save(fileCreateInput)
  }

  async getFiles(){
    return this.filesRepository.find()
  }

  async getFileById(id: string){
    return this.filesRepository.findOneBy({ id })
  }

  async removeFile(id: string){
    await this.filesRepository.delete({ id })
  }
}