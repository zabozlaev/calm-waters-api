import { IsString, Length } from 'class-validator';

export class UpdateStageDto {
  @Length(3, 32)
  @IsString()
  name: string;
}
