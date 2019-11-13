import { TagsResponse } from './dtos/tagsResponse';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dtos/createTag.dto';
import { AuthRequiredGuard } from './../auth/guards/auth.guard';
import { UserId } from '../user/user.decorator';
import {
  Controller,
  Get,
  Post,
  Delete,
  UseGuards,
  Body,
  HttpStatus,
  HttpCode,
  Param,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiUseTags,
  ApiImplicitParam,
  ApiImplicitQuery,
} from '@nestjs/swagger';
import { PaginationParams } from '../shared/dtos/paginationParams';

@ApiUseTags('tags')
@Controller('/tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiOkResponse({
    type: TagsResponse,
  })
  @UseGuards(AuthRequiredGuard)
  @Get('/')
  async list(@Param() params, @UserId() id) {}

  @UseGuards(AuthRequiredGuard)
  @Get('/:id')
  async show(@Param() params, @UserId() id) {}

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthRequiredGuard)
  @Post()
  async create(@Body() body: CreateTagDto, @UserId() id) {
    const data = await this.tagsService.create(body, id);
    return data;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthRequiredGuard)
  @Delete('/:id')
  async delete() {}
}
