import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { SaveCategoryDto } from '../dto/save-category.dto';
import { CacheKey } from '@nestjs/cache-manager';
import { LoggedUser } from '../../auth/decorators/user.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {
  }

  @Get()
  async findAll(@LoggedUser() loggedUser: any) {
    return await this.service.findAll(loggedUser);
  }

  @Get(':id')
  async findById(@LoggedUser() loggedUser: any, @Param('id') id: number) {
    return await this.service.findById(id, loggedUser);
  }

  @Post()
  async save(@LoggedUser() loggedUser: any, @Body() dto: SaveCategoryDto) {
    return await this.service.save(dto, loggedUser);
  }
}
