import { LabelEntity } from './../label.entity';
import { CreatePaginationResponse } from '../../shared/dtos/paginationResponse';

export class LabelsResponse extends CreatePaginationResponse<LabelEntity>(
  LabelEntity,
) {}
