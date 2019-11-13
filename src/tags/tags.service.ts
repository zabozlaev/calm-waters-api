import { PaginationParams } from './../shared/dtos/paginationParams';
import { UserService } from './../user/user.service';
import { TagsEntity } from './tags.entity';
import { CreateTagDto } from './dtos/createTag.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsResponse } from './dtos/tagsResponse';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagsEntity)
    private readonly tagsRepo: Repository<TagsEntity>,
    private readonly userService: UserService,
  ) {}

  async create({ title }: CreateTagDto, userId: string) {
    const user = await this.userService.findById(userId);

    const tag = new TagsEntity();
    tag.user = user;
    tag.title = title;

    return this.tagsRepo.save(tag);
  }

  async list(
    { skip, take }: PaginationParams,
    userId: string,
  ): Promise<TagsResponse> {
    const user = await this.userService.findById(userId);

    const [data, total] = await this.tagsRepo.findAndCount({
      where: { user },
      skip,
      take,
    });

    return { data, total };
  }

  async findOne() {}

  async delete() {}
}
