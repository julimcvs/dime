import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { ExpenseController } from './controller/expense.controller';
import { ExpenseService } from './service/expense.service';
import { ExpenseRepository } from './repository/expense.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [SharedModule, UserModule],
  controllers: [ExpenseController],
  exports: [ExpenseService],
  providers: [ExpenseService, ExpenseRepository]
})
export class ExpenseModule {
}
