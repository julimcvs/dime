import { Injectable, OnModuleInit } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class BillSchedulerService implements OnModuleInit {
  constructor(
    @InjectQueue('bills') private readonly billsQueue: Queue,
  ) {
  }

  async onModuleInit() {
    await this.scheduleBillProcessing();
  }

  async scheduleBillProcessing() {
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
