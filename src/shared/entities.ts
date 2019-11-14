import { StageEntity } from './../stage/stage.entity';
import { PipelineEntity } from './../pipeline/pipeline.entity';
import { LabelEntity } from './../label/label.entity';
import { HistoryEntity } from './../history/history.entity';
import { DealEntity } from './../deal/deal.entity';
import { UserEntity } from './../user/user.entity';

export const entities = [
  UserEntity,
  DealEntity,
  HistoryEntity,
  LabelEntity,
  PipelineEntity,
  StageEntity,
];
