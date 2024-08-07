import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { SaveSallaryDto } from '../dto/save-sallary.dto';
import { Sallary } from '../../../model/entities/sallary.entity';
import { SallaryRepository } from '../repository/sallary.repository';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class SallaryService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly repository: SallaryRepository,
    private readonly userService: UserService) {
  }

  async findUserSallary(loggedUser: any) {
    const user = await this.userService.findById(loggedUser.sub);
    return await this.repository.findOne({
      where: {
        user: { id: user.id },
      },
    });
  }

  async save(dto: SaveSallaryDto, loggedUser: any) {
    await this.cacheManager.del('/sallary');
    const user = await this.userService.findById(loggedUser.sub);
    let userSallary = await this.findUserSallary(loggedUser);
    if (!userSallary) {
      userSallary = new Sallary();
    }
    userSallary.sallary = dto.sallary;
    userSallary.user = user;
    return await this.repository.save(userSallary);
  }
}