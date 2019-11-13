import { ApiModelProperty } from '@nestjs/swagger';
export function CreatePaginationResponse<T>(type) {
  class PaginationResponse {
    @ApiModelProperty()
    total: number;

    @ApiModelProperty({
      type,
    })
    data: T[];
  }

  return PaginationResponse;
}
