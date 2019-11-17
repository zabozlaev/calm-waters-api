import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { StageService } from './stage.service';
import { AuthRequiredGuard } from '../auth/guards/auth.guard';
import { CreateStageDto } from './dtos/createStage.dto';
import { UserId } from '../user/user.decorator';
import { PaginationParams } from '../shared/dtos/paginationParams';

@ApiUseTags('stages')
@UseGuards(AuthRequiredGuard)
@Controller('/stages')
export class StageController {
  constructor(private readonly stageService: StageService) {}

  @Get('/')
  async list(@Query() params: PaginationParams, @UserId() userId: string) {
    const data = await this.stageService.list(params, userId);

    return data;
  }

  @Get('/:id')
  async show(@Param('id') id: string, @UserId() userId: string) {
    const data = await this.stageService.findForUser(id, userId);

    return data;
  }

  @Post('/')
  async create(@Body() body: CreateStageDto, @UserId() userId: string) {
    const data = await this.stageService.create(body, userId);

    return data;
  }
}
