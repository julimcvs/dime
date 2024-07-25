import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ExpenseService } from '../service/expense.service';
import { SaveExpenseDto } from '../dto/save-expense.dto';
import { MonthYearDto } from '../../../model/dto/month-year.dto';
import { LoggedUser } from '../../auth/decorators/user.decorator';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly service: ExpenseService) {
  }

  @Delete(':id')
  async delete(@LoggedUser() loggedUser: any, @Param('id') id: number) {
    return await this.service.delete(id, loggedUser);
  }

  @Get(':id')
  async findById(@LoggedUser() loggedUser: any, @Param('id') id: number) {
    return await this.service.findById(id, loggedUser);
  }

  @Post('get-by-month')
  async getByMonth(@LoggedUser() loggedUser: any, @Body() dto: MonthYearDto) {
    return await this.service.findAllByMonth(dto, loggedUser);
  }

  @Get('year-comparison-by-category')
  async getYearComparisonByCategory(@LoggedUser() loggedUser: any, ) {
    return await this.service.getYearComparisonByCategory(loggedUser);
  }

  @Post()
  async save(@LoggedUser() loggedUser: any, @Body() dto: SaveExpenseDto) {
    return await this.service.save(dto, loggedUser);
  }
}
