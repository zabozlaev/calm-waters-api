import { CreateUserDto } from './dtos/createUser';
import { BaseRepo } from './../shared/baseRepo';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: BaseRepo<UserEntity>,
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
}
