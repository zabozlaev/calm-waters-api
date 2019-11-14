import { CreatePaginationResponse } from 'src/shared/dtos/paginationResponse';
import { PipelineEntity } from '../pipeline.entity';

export class PipelinesResponse extends CreatePaginationResponse<PipelineEntity>(
  PipelineEntity,
) {}
