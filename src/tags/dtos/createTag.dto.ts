import { ApiModelProperty, ApiImplicitBody } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @Length(3, 64)
  @ApiModelProperty({
    required: true,
  })
  title: string;
}
