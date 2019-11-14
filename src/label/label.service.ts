import { UpdateLabelDto } from './dtos/updateLabel.dto';
import { LabelsResponse } from './dtos/labelsResponse';
import { PaginationParams } from './../shared/dtos/paginationParams';
import { UserService } from './../user/user.service';
import { CreateLabelDto } from './dtos/createLabel.dto';
import { LabelEntity } from './label.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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

  async update(id: string, { name }: UpdateLabelDto, userId: string) {
    const label = await this.findForUser(id, userId);
    label.name = name;

    return this.labelRepo.save(label);
  }

  async findForUser(id: string, userId: string) {
    const label = await this.labelRepo
      .createQueryBuilder('label')
      .where('id = :id AND "userId" = :userId', { id, userId })
      .getOne();

    if (!label) {
      throw new HttpException(
        'No label found for such user',
        HttpStatus.NOT_FOUND,
      );
    }

    return label;
  }
}
