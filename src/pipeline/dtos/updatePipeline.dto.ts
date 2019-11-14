import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdatePipelineDto {
  @ApiModelProperty()
  @IsString()
  name: string;
}
