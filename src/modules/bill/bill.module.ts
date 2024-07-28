import { Module } from '@nestjs/common';
import { BillService } from './service/bill.service';
import { BillHistoryService } from './service/bill-history.service';
import { BillRepository } from './repository/bill.repository';
import { BillHistoryRepository } from './repository/bill-history.repository';
import { BillConsumer } from '../../consumers/bill.consumer';
import { BillController } from './controller/bill.controller';
import { SharedModule } from '../../shared/shared.module';
import { UserModule } from '../user/user.module';
import { BillSchedulerService } from './scheduler/bill-scheduler.service';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    SharedModule,
    UserModule,
    EmailModule
  ],
  controllers: [BillController],
  exports: [BillService, BillHistoryService],
  providers: [
    BillConsumer,
    BillService,
    BillHistoryService,
    BillRepository,
    BillHistoryRepository,
    BillSchedulerService
  ],
})
export class BillModule {
}
