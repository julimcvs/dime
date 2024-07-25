import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Bill } from '../../../model/entities/bill.entity';

@Injectable()
export class BillRepository extends Repository<Bill> {
  constructor(private dataSource: DataSource) {
    super(Bill, dataSource.createEntityManager());
  }
}
