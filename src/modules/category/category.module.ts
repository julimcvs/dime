import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { CategoryController } from './controller/category.controller';
import { CategoryService } from './service/category.service';
import { CategoryRepository } from './repository/category.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [SharedModule, UserModule],
  controllers: [CategoryController],
  exports: [CategoryService],
  providers: [CategoryService, CategoryRepository]
})
export class CategoryModule {
}
