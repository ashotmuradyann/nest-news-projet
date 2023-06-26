import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { NewsEntity } from "./entities/news.entity";
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
    const newsInput = {
      name: newsCreateInput.name,
      material: newsCreateInput.material,
      categories: newsCreateInput.categories ? newsCreateInput.categories.map(val => ({ id: val })) : null,
      medias: newsCreateInput.medias ? newsCreateInput.medias.map(val => ({ id: val })) : null
    }

    return await this.newsRepository.save(newsInput)
  }

  async updateNews(newsUpdateInput: NewsUpdateInput){
    const id = newsUpdateInput.id
    const isAvailable = await this.newsRepository.findOneBy({ id })
    if(!isAvailable){
      throw new NotFoundException()
    }
    const newsInput = {
      id,
      name: newsUpdateInput.name,
      material: newsUpdateInput.material,
      medias: newsUpdateInput.medias?.map(val => ({id: val})),
      categories: newsUpdateInput.categories?.map(val => ({id: val}))
    }
    await this.newsRepository.save(newsInput)
    return this.newsRepository.findOneBy({id})
  }

  async getNews(){
    const news =  await this.newsRepository.find({
      relations: ["categories", "medias"]
    })
    return news
  }

  async removeNews(id: string){
    await this.newsRepository.delete({id})
    return id
  }
}