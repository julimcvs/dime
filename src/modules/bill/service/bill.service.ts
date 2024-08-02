import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Bill } from '../../../model/entities/bill.entity';
import { SaveBillDto } from '../dto/save-bill.dto';
import { BillRepository } from '../repository/bill.repository';
import { MonthYearDto } from '../../../model/dto/month-year.dto';
import { BillHistoryService } from './bill-history.service';
import { BillDto } from '../dto/bill.dto';
import { BillHistory } from '../../../model/entities/bill-history.entity';
import { UserService } from '../../user/service/user.service';
import { User } from '../../../model/entities/user.entity';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class BillService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly repository: BillRepository,
    private readonly billHistoryService: BillHistoryService,
    private readonly userService: UserService,
  ) {
  }

  async delete(id: number, loggedUser: any) {
    const user = await this.userService.findById(loggedUser.sub);
    const bill = await this.findById(id, user);
    bill.isDeleted = true;
    return await this.repository.save(bill);
  }

  async findById(id: number, loggedUser: any): Promise<Bill> {
    const user = await this.userService.findById(loggedUser.sub);
    return await this.findBillById(id, user);
  }

  async findAllByMonth(dto: MonthYearDto, loggedUser: any): Promise<BillDto[]> {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const user = await this.userService.findById(loggedUser.sub);
    if (dto.month >= month && dto.year >= year) {
      return await this.findMonthBills(user);
    }
    return await this.findBillHistoryByMonthAndYear(dto, user);
  }

  async findUserTodaysBills(userId: number) {
    const today = new Date();
    const day = today.getDate();
    const processedBills = await this.billHistoryService.findAllByUserIdAndDate(userId, today);
    const processedBillsIds = processedBills.map(bill => bill.bill_id);
    const queryBuilder = this.repository.createQueryBuilder('bill')
      .innerJoin('bill.user', 'user')
      .where('bill.recurrentPaymentDay = :day', { day })
      .andWhere('user.id = :userId', { userId });

    if (processedBillsIds.length > 0) {
      queryBuilder.andWhere('bill.id NOT IN (:...billsIds)', { billsIds: processedBillsIds });
    }

    return await queryBuilder.getMany();
  }

  async save(dto: SaveBillDto, loggedUser: any) {
    const user = await this.userService.findById(loggedUser.sub);
    await this.cacheManager.del('/bills');
    if (dto.id) {
      await this.cacheManager.del(`/bills/${dto.id}`);
      const existingBill = await this.findBillById(dto.id, user);
      return await this.updateBill(existingBill, dto);
    }
    return await this.createBill(dto, user);
  }

  private async createBill(dto: SaveBillDto, user: User) {
    const newBill: Bill = new Bill();
    Object.assign(newBill, dto);
    newBill.isDeleted = false;
    newBill.user = user;
    return await this.repository.save(newBill);
  }

  private async findBillById(id: number, user: User) {
    const bill = await this.repository.findOne({
      where: {
        id,
        user: { id: user.id },
      },
    });
    if (bill) {
      return bill;
    }
    throw new BadRequestException('Bill not found');
  }

  private async findBillHistoryByMonthAndYear(dto: MonthYearDto, user: User) {
    const billHistory = await this.billHistoryService.findAllByUserAndMonth(dto, user.id);
    return billHistory.map((history: BillHistory) => {
      const billDto = new BillDto();
      const bill = history.bill;
      Object.assign(billDto, bill);
      return billDto;
    });
  }

  private async findMonthBills(user: User) {
    const bills = await this.repository.find({
      where: {
        isDeleted: false,
        user: { id: user.id },
      },
    });
    return bills.map((bill: Bill) => {
      const billDto: BillDto = { ...bill };
      return billDto;
    });
  }

  private async updateBill(bill: Bill, dto: SaveBillDto) {
    Object.assign(bill, dto);
    return await this.repository.save(bill);
  }
}
