import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { UserService } from './service/user.service';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [SharedModule],
  exports: [UserService],
  providers: [UserService, UserRepository]
})
export class UserModule {
}
