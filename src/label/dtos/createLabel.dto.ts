import { ApiModelProperty } from '@nestjs/swagger';

export class CreateLabelDto {
  @ApiModelProperty()
  name: string;
}
