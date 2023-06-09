import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "./entities/category-create.entity";
import { CategoryCreateInput } from "./inputs/category-create.input";
import { CategoryUpdateInput } from "./inputs/category-update.input";

@Injectable()
export class CategoryService{
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>
  ) {}

  async createCategory(categoryCreateInput: CategoryCreateInput){
    return await this.categoryRepository.save(categoryCreateInput)
  }

  async updateCategory(categoryCreateInput: CategoryUpdateInput){
    await this.categoryRepository.update({id: categoryCreateInput.id}, categoryCreateInput)
    return this.categoryRepository.findOneBy({id: categoryCreateInput.id})
  }

  async getCategory(){
    return await this.categoryRepository.find()
  }

  async deleteCategory(id: string){
    await this.categoryRepository.delete({id})
    return id
  }
}