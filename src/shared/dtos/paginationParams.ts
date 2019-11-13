import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class PaginationParams {
  @IsNumberString()
  @ApiModelProperty()
  take: number;

  @IsNumberString()
  @ApiModelProperty()
  skip: number;
}
