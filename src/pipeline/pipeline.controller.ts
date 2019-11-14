import { UpdatePipelineDto } from './dtos/updatePipeline.dto';
import { PaginationParams } from './../shared/dtos/paginationParams';
import { CreatePipelineDto } from './dtos/createPipeline.dto';
import { AuthRequiredGuard } from './../auth/guards/auth.guard';
import { PipelineService } from './pipeline.service';
import { ApiUseTags } from '@nestjs/swagger';
import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Query,
  Param,
  Patch,
} from '@nestjs/common';
import { UserId } from '../user/user.decorator';

@ApiUseTags('pipelines')
@Controller('/pipelines')
@UseGuards(AuthRequiredGuard)
export class PipelineController {
  constructor(private readonly pipelineService: PipelineService) {}

  @Get('/')
  async list(@Query() params: PaginationParams, @UserId() id: string) {
    const data = await this.pipelineService.list(params, id);
    return data;
  }

  @Get('/:id')
  async show(@Param('id') id: string, @UserId() userId: string) {
    const pipeline = await this.pipelineService.findForUser(id, userId);
    return pipeline;
  }

  @Post('/')
  async create(@Body() body: CreatePipelineDto, @UserId() id: string) {
    const data = await this.pipelineService.create(body, id);
    return data;
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdatePipelineDto,
    @UserId() userId: string,
  ) {
    return this.pipelineService.update(id, body, userId);
  }
}
