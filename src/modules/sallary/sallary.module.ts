import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { UserModule } from '../user/user.module';
import { SallaryController } from './controller/sallary.controller';
import { SallaryService } from './service/sallary.service';
import { SallaryRepository } from './repository/sallary.repository';

@Module({
  imports: [SharedModule, UserModule],
  controllers: [SallaryController],
  exports: [SallaryService],
  providers: [SallaryService, SallaryRepository]
})
export class SallaryModule {
}
