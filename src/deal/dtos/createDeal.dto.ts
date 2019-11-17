import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CreateDealDto {
  @ApiModelProperty()
  linkedInId: string;
  @ApiModelProperty()
  customFields: any;
  @ApiModelProperty()
  stageId: string;
  @ApiModelPropertyOptional()
  labelId?: string;
}
