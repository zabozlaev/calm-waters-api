import { ApiModelProperty } from '@nestjs/swagger';

export class CreateStageDto {
  name: string;
  pipelineId: string;
}
