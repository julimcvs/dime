import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SaveBillDto } from '../dto/save-bill.dto';
import { BillService } from '../service/bill.service';
import { MonthYearDto } from '../../../model/dto/month-year.dto';
import { LoggedUser } from '../../auth/decorators/user.decorator';

@Controller('bills')
export class BillController {
  constructor(private readonly service: BillService) {
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

  @Post()
  async save(@LoggedUser() loggedUser: any, @Body() dto: SaveBillDto) {
    return await this.service.save(dto, loggedUser);
  }
}
