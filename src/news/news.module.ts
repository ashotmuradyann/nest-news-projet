import { Module } from '@nestjs/common';
import { NewsService } from "./news.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NewsEntity } from "./entities/news.entity";
import { NewsResolver } from "./news.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntity])],
  providers: [NewsService, NewsResolver],
  exports: [NewsService]
})
export class NewsModule {}
