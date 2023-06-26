import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CategoryService } from "./category.service";
import { CategoryEntity } from "./entities/category.entity";
import { CategoryCreateInput } from "./inputs/category-create.input";
import { CategoryUpdateInput } from "./inputs/category-update.input";

@Resolver("categories")
export class CategoriesResolver{
  constructor(private readonly categoryService: CategoryService) {
  }

  @Mutation(()=>CategoryEntity)
  createCategory(@Args("createCategoryData") createCategoryData: CategoryCreateInput){
    return this.categoryService.createCategory(createCategoryData)
  }

  @Mutation(()=>CategoryEntity)
  async updateCategory(@Args("updateCategory") updateCategoryInfo: CategoryUpdateInput){
    return await this.categoryService.updateCategory(updateCategoryInfo)
  }

  @Query(()=>[CategoryEntity])
  async getAllCategory(){
    return this.categoryService.getCategory()
  }

  @Mutation(()=>String)
  async removeCategory(@Args("id") id: string){
    return await this.categoryService.deleteCategory(id)
  }
}