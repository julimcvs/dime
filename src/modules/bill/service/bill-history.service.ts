import { Injectable, OnModuleInit } from '@nestjs/common';
import { MonthYearDto } from '../../../model/dto/month-year.dto';
import { BillHistoryRepository } from '../repository/bill-history.repository';
import { BillHistory } from '../../../model/entities/bill-history.entity';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class BillHistoryService implements OnModuleInit {
  constructor(
    @InjectQueue('bills') private readonly billsQueue: Queue,
    private readonly repository: BillHistoryRepository,
  ) {
  }

  async onModuleInit() {
    await this.startQueueProcessBills();
  }

  async findAllByMonth(dto: MonthYearDto): Promise<BillHistory[]> {
    return await this.repository.findBy({
      month: dto.month,
      year: dto.year,
    });
  }

  async saveAll(billsHistories: BillHistory[]) {
    return await this.repository.save(billsHistories);
  }

  async startQueueProcessBills() {
    await this.billsQueue.add(
      'process-bills',
      {},
      {
        repeat: {
          cron: '0 0 * * *', // Every day at midnight
        },
      },
    );
  }
}
