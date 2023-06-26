import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "./entities/category.entity";
import { CategoryService } from "./category.service";
import { CategoriesResolver } from "./category.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [CategoryService, CategoriesResolver],
  exports: [CategoryService]
})
export class CategoryModule {}
