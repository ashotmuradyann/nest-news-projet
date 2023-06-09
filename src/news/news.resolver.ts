import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { NewsEntity } from "./entities/news-create.entity";
import { NewsService } from "./news.service";
import { NewsCreateInput } from "./inputs/news-create.input";
import { NewsUpdateInput } from "./inputs/news-update.input";

@Resolver("news")
export class NewsResolver{
  constructor(private readonly newsService: NewsService) {
  }

  @Mutation(()=>NewsEntity)
  createNews(@Args("createNews") createNewsInfo: NewsCreateInput){
    return this.newsService.createNews(createNewsInfo)
  }

  @Mutation(()=>NewsEntity)
  async updateNews(@Args("updateInput") updateNewsInfo: NewsUpdateInput){
    return await this.newsService.updateNews(updateNewsInfo)
  }

  @Query(()=>[NewsEntity])
  async getAllNews(){
    return this.newsService.getNews()
  }

  @Mutation(()=>String)
  async removeNews(@Args("id") id: string){
    return await this.newsService.removeNews(id)
  }
}