import { CreateUserDto } from './dtos/createUser';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  create(data: CreateUserDto) {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  async findByLinkedInId(linkedInId: string) {
    return this.userRepo.findOne({
      linkedInId,
    });
  }

  async findById(id: string) {
    return this.userRepo.findOneOrFail({
      where: {
        id,
      },
    });
  }
}
