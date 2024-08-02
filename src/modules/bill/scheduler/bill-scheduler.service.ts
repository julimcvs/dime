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
    await this.billsQueue.clean(60000, 'completed');
    await this.billsQueue.clean(60000, 'active');
    await this.billsQueue.clean(60000, 'delayed');
    await this.billsQueue.clean(60000, 'wait');
    await this.billsQueue.clean(60000, 'paused');
    await this.billsQueue.clean(60000, 'failed');
    await this.billsQueue.add(
      'process-bills',
      {},
      {
        repeat: {
          cron: '0 0 * * *', // Every day at midnight
        },
      },
    );
    await this.billsQueue.add(
      'process-bills',
      {},
      {},
    );
  }
}
