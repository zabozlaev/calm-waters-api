import { TagsEntity } from './../tags.entity';
import { CreatePaginationResponse } from '../../shared/dtos/paginationResponse';

export class TagsResponse extends CreatePaginationResponse<TagsEntity>(
  TagsEntity,
) {}
