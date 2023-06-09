import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { NewsEntity } from "./entities/news-create.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { NewsCreateInput } from "./inputs/news-create.input";
import { NewsUpdateInput } from "./inputs/news-update.input";

@Injectable()
export class NewsService{
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>
  ) {}

  async createNews(newsCreateInput: NewsCreateInput){
    return await this.newsRepository.save(newsCreateInput)
  }

  async updateNews(newsCreateInput: NewsUpdateInput){
    await this.newsRepository.update({id: newsCreateInput.id}, newsCreateInput)
    return this.newsRepository.findOneBy({id: newsCreateInput.id})
  }

  async getNews(){
    return await this.newsRepository.find()
  }

  async removeNews(id: string){
    await this.newsRepository.delete({id})
    return id
  }
}