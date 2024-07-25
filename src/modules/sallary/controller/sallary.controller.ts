import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoggedUser } from '../../auth/decorators/user.decorator';
import { SaveSallaryDto } from '../dto/save-sallary.dto';
import { SallaryService } from '../service/sallary.service';

@Controller("sallary")
export class SallaryController {
  constructor(private readonly service: SallaryService) {
  }

  @Get()
  async findUserSallary(@LoggedUser() loggedUser: any) {
    return await this.service.findUserSallary(loggedUser);
  }

  @Post()
  async save(@LoggedUser() loggedUser: any, @Body() dto: SaveSallaryDto) {
    return await this.service.save(dto, loggedUser);
  }
}
