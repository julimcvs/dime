import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../../../model/entities/user.entity';
import { UserRepository } from '../repository/user.repository';
import { SaveUserDto } from '../../../model/dto/save-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
  ) {
  }

  async findByEmail(email: string) {
    return await this.repository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });
    if (user) {
      return user;
    }
    throw new BadRequestException('User not found');
  }

  async createUser(dto: SaveUserDto) {
    const user: User = new User();
    Object.assign(user, dto);
    return await this.repository.save(user);
  }

  private async updateUser(user: User, dto: SaveUserDto) {
    Object.assign(user, dto);
    return await this.repository.save(user);
  }
}
