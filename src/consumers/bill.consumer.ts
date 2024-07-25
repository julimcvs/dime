import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { BillHistoryService } from '../modules/bill/service/bill-history.service';
import { Job } from 'bull';
import { BillService } from '../modules/bill/service/bill.service';
import { Bill } from '../model/entities/bill.entity';
import { BillHistory } from '../model/entities/bill-history.entity';

@Processor('bills')
export class BillConsumer {
  private readonly logger = new Logger(BillConsumer.name);

  constructor(
    private readonly billService: BillService,
    private readonly billHistoryService: BillHistoryService,
  ) {
  }

  @Process('process-bills')
  async processBills(job: Job) {
    const bills: Bill[] = await this.billService.findTodaysBills();
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const billsHistories = bills.map(bill => {
      const billHistory = new BillHistory();
      billHistory.bill = bill;
      billHistory.month = month;
      billHistory.year = year;
      billHistory.price = bill.price;
      return billHistory;
    });
    await this.billHistoryService.saveAll(billsHistories);
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    const { id, name, queue, finishedOn, returnvalue } = job;
    const completionTime = finishedOn ? new Date(finishedOn).toISOString() : '';
    this.logger.log(
      `Bill processed successfully. Job id: ${id}, name: ${name} completed in queue ${queue.name} on ${completionTime}. Result: ${returnvalue}`,
    );
  }

  @OnQueueFailed()
  onFailed(job: Job) {
    const { id, name, queue, failedReason } = job;
    this.logger.error(`Error trying to process bill. Job id: ${id}, name: ${name} failed in queue ${queue.name}. Failed reason: ${failedReason}`);
  }

  @OnQueueActive()
  onActive(job: Job) {
    const { id, name, queue, timestamp } = job;
    const startTime = timestamp ? new Date(timestamp).toISOString() : '';
    this.logger.log(`Processing bill. Job id: ${id}, name: ${name} starts in queue ${queue.name} on ${startTime}.`);
  }
}