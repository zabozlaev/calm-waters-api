import { LabelsResponse } from './dtos/labelsResponse';
import { PaginationParams } from './../shared/dtos/paginationParams';
import { UserService } from './../user/user.service';
import { CreateLabelDto } from './dtos/createLabel.dto';
import { LabelEntity } from './label.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LabelService {
  constructor(
    @InjectRepository(LabelEntity)
    private readonly labelRepo: Repository<LabelEntity>,
    private readonly userService: UserService,
  ) {}

  async create({ name }: CreateLabelDto, userId: string) {
    const user = await this.userService.findById(userId);

    const label = new LabelEntity();
    label.name = name;
    label.user = user;
    return this.labelRepo.save(label);
  }

  async list(
    { skip, take }: PaginationParams,
    userId: string,
  ): Promise<LabelsResponse> {
    const user = await this.userService.findById(userId);

    const [data, total] = await this.labelRepo.findAndCount({
      where: { user },
      skip,
      take,
    });

    return { data, total };
  }
}
