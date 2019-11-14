import { UpdateLabelDto } from './dtos/updateLabel.dto';
import { PaginationParams } from './../shared/dtos/paginationParams';
import { CreateLabelDto } from './dtos/createLabel.dto';
import { AuthRequiredGuard } from './../auth/guards/auth.guard';
import { LabelService } from './label.service';
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

@ApiUseTags('labels')
@Controller('/labels')
@UseGuards(AuthRequiredGuard)
export class LabelController {
  constructor(private readonly labelService: LabelService) {}

  @Get('/')
  async list(@Query() params: PaginationParams, @UserId() id: string) {
    const data = await this.labelService.list(params, id);
    return data;
  }

  @Get('/:id')
  async show(@Param('id') id: string, @UserId() userId: string) {
    const label = await this.labelService.findForUser(id, userId);
    return label;
  }

  @Post('/')
  async create(@Body() body: CreateLabelDto, @UserId() id: string) {
    const data = await this.labelService.create(body, id);
    return data;
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateLabelDto,
    @UserId() userId: string,
  ) {
    return this.labelService.update(id, body, userId);
  }
}
