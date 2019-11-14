import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePipelineDto {
  @ApiModelProperty()
  @IsString()
  name: string;
}
