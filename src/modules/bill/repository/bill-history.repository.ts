import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BillHistory } from '../../../model/entities/bill-history.entity';

@Injectable()
export class BillHistoryRepository extends Repository<BillHistory> {
  constructor(private dataSource: DataSource) {
    super(BillHistory, dataSource.createEntityManager());
  }
}
