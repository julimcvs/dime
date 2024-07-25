import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Expense } from '../../../model/entities/expense.entity';

@Injectable()
export class ExpenseRepository extends Repository<Expense> {
  constructor(private dataSource: DataSource) {
    super(Expense, dataSource.createEntityManager());
  }
}
