import { ApiModelProperty } from '@nestjs/swagger';
import { IsUUID, IsString, Length } from 'class-validator';

export class CreateStageDto {
  @IsString()
  @Length(3, 32)
  @ApiModelProperty()
  name: string;

  @IsUUID()
  @ApiModelProperty()
  pipelineId: string;
}
