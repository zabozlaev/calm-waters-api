import { UpdatePipelineDto } from './dtos/updatePipeline.dto';
import { PipelinesResponse } from './dtos/pipelinesResponse';
import { PaginationParams } from './../shared/dtos/paginationParams';
import { UserService } from './../user/user.service';
import { CreatePipelineDto } from './dtos/createPipeline.dto';
import { PipelineEntity } from './pipeline.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PipelineService {
  constructor(
    @InjectRepository(PipelineEntity)
    private readonly pipelineRepo: Repository<PipelineEntity>,
    private readonly userService: UserService,
  ) {}

  async create({ name }: CreatePipelineDto, userId: string) {
    const user = await this.userService.findById(userId);

    const pipeline = new PipelineEntity();
    pipeline.name = name;
    pipeline.user = user;
    return this.pipelineRepo.save(pipeline);
  }

  async list(
    { skip, take }: PaginationParams,
    userId: string,
  ): Promise<PipelinesResponse> {
    const user = await this.userService.findById(userId);

    const [data, total] = await this.pipelineRepo.findAndCount({
      where: { user },
      skip,
      take,
    });

    return { data, total };
  }

  async update(id: string, { name }: UpdatePipelineDto, userId: string) {
    const pipeline = await this.findForUser(id, userId);
    pipeline.name = name;

    return this.pipelineRepo.save(pipeline);
  }

  async findForUser(id: string, userId: string) {
    const pipeline = await this.pipelineRepo
      .createQueryBuilder('pipeline')
      .where('id = :id AND "userId" = :userId', { id, userId })
      .getOne();

    if (!pipeline) {
      throw new HttpException(
        'No pipeline found for such user',
        HttpStatus.NOT_FOUND,
      );
    }

    return pipeline;
  }
}
