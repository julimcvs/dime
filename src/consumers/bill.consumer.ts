import { InjectQueue, OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { BillHistoryService } from '../modules/bill/service/bill-history.service';
import { Job, Queue } from 'bull';
import { BillService } from '../modules/bill/service/bill.service';
import { Bill } from '../model/entities/bill.entity';
import { BillHistory } from '../model/entities/bill-history.entity';
import { UserService } from '../modules/user/service/user.service';
import fs from 'fs';
import { User } from '../model/entities/user.entity';
import { EmailService } from '../modules/email/service/email.service';

@Processor('bills')
export class BillConsumer {
  private readonly logger = new Logger(BillConsumer.name);

  constructor(
    @InjectQueue('bills') private readonly billsQueue: Queue,
    private readonly billService: BillService,
    private readonly billHistoryService: BillHistoryService,
    private readonly userService: UserService,
    private readonly emailService: EmailService
  ) {
  }

  @Process('process-bills')
  async processBills(job: Job) {
    const batchSize = 100;
    let offset = 0;
    let users;
    do {
      users = await this.userService.findUsersBatch(offset, batchSize);
      for (const user of users) {
        await this.billsQueue.add(
          `process-user-bills-${user.id}`,
          {
            userId: user.id,
          },
        );
      }
      offset += batchSize;
    } while (users.length === batchSize);

  }

  @Process('process-user-bills')
  async processUserBills(job: Job) {
    const { userId } = job.data;
    const bills: Bill[] = await this.billService.findUserTodaysBills(userId);
    const user: User = await this.userService.findById(userId);
    await this.generateBillHistories(bills);
    await this.notifyUser(bills, user);
  }

  private async generateBillHistories(bills: Bill[]) {
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


  private async notifyUser(bills: Bill[], user: User) {
    let html = fs.readFileSync('src/resources/templates/user-bills.html').toString();
    html = html.replace("${NAME}", user.username);
    html = html.replace("${DATE}", new Date().toISOString());
    const billsData = this.getBillsHtml(bills);
    html = html.replace("${BILLS}", billsData);
    await this.emailService.sendEmail(html, "Today's bill report", user.email);
  }

  private getBillsHtml(bills: Bill[]) {
    let billsData = '<tbody>';
    bills.forEach(bill => {
      billsData += `<tr>
        <td>${bill.description}</td>
        <td>${bill.price}</td>
      </tr>`;
    });
    billsData += '</tbody>';
    return billsData;
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