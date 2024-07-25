import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Category } from '../../../model/entities/category.entity';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(private dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }
}
