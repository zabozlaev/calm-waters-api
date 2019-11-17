import { StageEntity } from '../stage.entity';
import { CreatePaginationResponse } from '../../shared/dtos/paginationResponse';

export class StagesResponse extends CreatePaginationResponse<StageEntity>(
  StageEntity,
) {}
