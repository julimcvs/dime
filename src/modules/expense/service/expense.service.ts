import { BadRequestException, Injectable } from '@nestjs/common';
import { ExpenseRepository } from '../repository/expense.repository';
import { Expense } from '../../../model/entities/expense.entity';
import { Between } from 'typeorm';
import { MonthYearDto } from '../../../model/dto/month-year.dto';
import { SaveExpenseDto } from '../dto/save-expense.dto';
import { UserService } from '../../user/service/user.service';
import { User } from '../../../model/entities/user.entity';

@Injectable()
export class ExpenseService {
  constructor(
    private readonly repository: ExpenseRepository,
    private readonly userService: UserService,
  ) {
  }

  async delete(id: number, loggedUser: any) {
    const user = await this.userService.findById(loggedUser.sub);
    const expense = await this.findExpenseById(id, user);
    expense.isDeleted = true;
    return await this.repository.save(expense);
  }

  async findAllByMonth(dto: MonthYearDto, loggedUser: any): Promise<Expense[]> {
    const user = await this.userService.findById(loggedUser.sub);
    const date = new Date(dto.year, dto.month - 1);
    const { firstDay, lastDay } = this.getFirstAndLastDayOfMonth(date);
    return await this.repository.find({
      where: {
        isDeleted: false,
        paymentDay: Between(firstDay, lastDay),
        user: { id: user.id },
      },
      relations: ['category'],
    });
  }

  async getYearComparisonByCategory(loggedUser: any) {
    const user = await this.userService.findById(loggedUser.sub);
    return await this.repository.createQueryBuilder('expense')
      .select('category.description', 'category')
      .addSelect('extract(year from expense.paymentDay)', 'year')
      .addSelect('extract(month from expense.paymentDay)', 'month')
      .addSelect('sum(expense.price)', 'total')
      .innerJoin('expense.category', 'category')
      .innerJoin('expense.user', 'user')
      .where('expense.isDeleted = false')
      .andWhere('user.id = :userId', { userId: user.id })
      .groupBy('category.description, year, month')
      .orderBy('category.description, year, month')
      .getRawMany();
  }

  async findById(id: number, loggedUser: any): Promise<Expense> {
    const user = await this.userService.findById(loggedUser.sub);
    return await this.findExpenseById(id, user);
  }

  async findExpenseById(id: number, user: User) {
    const expense = await this.repository.findOne({ where: { id, user: { id: user.id } } });
    if (expense) {
      return expense;
    }
    throw new BadRequestException('Expense not found');
  }

  async save(dto: SaveExpenseDto, loggedUser: any) {
    const user = await this.userService.findById(loggedUser.sub);
    if (dto.id) {
      const existingExpense = await this.findExpenseById(dto.id, user);
      return await this.updateExpense(existingExpense, dto);
    }
    return await this.createExpense(dto, user);
  }

  private getFirstAndLastDayOfMonth(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return { firstDay, lastDay };
  }

  private async createExpense(dto: SaveExpenseDto, user: User) {
    const expense: Expense = new Expense();
    Object.assign(expense, dto);
    expense.category = { id: dto.categoryId } as any;
    expense.isDeleted = false;
    expense.user = user;
    return await this.repository.save(expense);
  }

  private async updateExpense(expense: Expense, dto: SaveExpenseDto) {
    Object.assign(expense, dto);
    expense.category = { id: dto.categoryId } as any;
    return await this.repository.save(expense);
  }
}
