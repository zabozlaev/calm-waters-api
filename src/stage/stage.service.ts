import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StageEntity } from './stage.entity';
import { CreateStageDto } from './dtos/createStage.dto';
import { PipelineService } from '../pipeline/pipeline.service';
import { PaginationParams } from '../shared/dtos/paginationParams';
import { StagesResponse } from './dtos/stagesResponse';

@Injectable()
export class StageService {
  constructor(
    @InjectRepository(StageEntity)
    private readonly stageRepo: Repository<StageEntity>,
    private readonly pipelineService: PipelineService,
  ) {}

  async create({ name, pipelineId }: CreateStageDto, userId: string) {
    const pipeline = await this.pipelineService.findForUser(pipelineId, userId);

    const stage = new StageEntity();
    stage.name = name;
    stage.pipeline = pipeline;

    return this.stageRepo.save(stage);
  }

  async list(
    { skip, take }: PaginationParams,
    userId: string,
  ): Promise<StagesResponse> {
    const createSelectQuery = (userId: string) => (
      selectFields: string,
      limit = true,
    ) => {
      const paginationAttachment = limit ? `LIMIT ${take} OFFSET ${skip}` : ``;

      return this.stageRepo.query(
        `
          SELECT ${selectFields} FROM stages s INNER JOIN pipelines p ON p.id = s."pipelineId" WHERE p."userId" = '${userId}' ${paginationAttachment}
        `,
      );
    };

    const queryWithSelect = createSelectQuery(userId);

    const dataQuery = queryWithSelect('s.*');
    const totalQuery = queryWithSelect('COUNT(s.id) as total', false);

    const [data, totalQueryResult] = await Promise.all([dataQuery, totalQuery]);

    const [{ total }] = totalQueryResult;

    return { data, total };
  }

  async findForUser(id: string, userId: string) {
    const stage = await this.stageRepo.findOne({
      relations: ['pipeline'],
      where: {
        id,
        pipeline: {
          userId,
        },
      },
    });

    return stage;
  }
}
