import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateLabelDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
