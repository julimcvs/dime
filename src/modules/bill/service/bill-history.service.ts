import { Injectable } from '@nestjs/common';
import { MonthYearDto } from '../../../model/dto/month-year.dto';
import { BillHistoryRepository } from '../repository/bill-history.repository';
import { BillHistory } from '../../../model/entities/bill-history.entity';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class BillHistoryService {
  constructor(
    @InjectQueue('bills') private readonly billsQueue: Queue,
    private readonly repository: BillHistoryRepository,
  ) {
  }

  async findAllByUserAndMonth(dto: MonthYearDto, userId: number): Promise<BillHistory[]> {
    return await this.repository.createQueryBuilder('billHistory')
      .innerJoin('billHistory.bill', 'bill')
      .innerJoin('bill.user', 'user')
      .andWhere('user.id = :userId', { userId: userId })
      .andWhere('billHistory.month = :month', { month: dto.month })
      .andWhere('billHistory.year = :year', { year: dto.year })
      .getMany();
  }

  async saveAll(billsHistories: BillHistory[]) {
    const batchSize = 100;
    for (let i = 0; i < billsHistories.length; i += batchSize) {
      await this.repository.save(billsHistories.slice(i, i + batchSize));
    }
  }
}
