import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repository/category.repository';
import { Category } from '../../../model/entities/category.entity';
import { SaveCategoryDto } from '../dto/save-category.dto';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { UserService } from '../../user/service/user.service';
import { User } from '../../../model/entities/user.entity';

@Injectable()
export class CategoryService {
  constructor(
    private readonly repository: CategoryRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly userService: UserService,
  ) {
  }

  async findAll(loggedUser: any) {
    const user = await this.userService.findById(loggedUser.sub);
    return await this.repository.find({
      where: {
        user: { id: user.id },
      },
    });
  }

  async findById(id: number, loggedUser: any): Promise<Category> {
    const user = await this.userService.findById(loggedUser.sub);
    return await this.findCategoryById(id, user);
  }

  async save(dto: SaveCategoryDto, loggedUser: any) {
    const user = await this.userService.findById(loggedUser.sub);
    const category = await this.saveCategory(dto, user);
    await this.cacheManager.del('find-all-categories');
    return category;
  }

  private async saveCategory(dto: SaveCategoryDto, user: User) {
    if (dto.id) {
      const existingCategory = await this.findCategoryById(dto.id, user);
      return await this.updateCategory(existingCategory, dto);
    }
    return await this.createCategory(dto, user);
  }

  private async createCategory(dto: SaveCategoryDto, user: User) {
    const category: Category = new Category();
    Object.assign(category, dto);
    category.user = user;
    return await this.repository.save(category);
  }

  private async updateCategory(category: Category, dto: SaveCategoryDto) {
    Object.assign(category, dto);
    return await this.repository.save(category);
  }

  private async findCategoryById(id: number, user: User) {
    const category = await this.repository.findOne({
      where: {
        id,
        user: {id: user.id}
      }
    });
    if (category) {
      return category;
    }
    throw new BadRequestException('Category not found');
  }
}
