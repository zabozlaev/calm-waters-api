import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { UserModule } from './../user/user.module';
import { TagsEntity } from './tags.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([TagsEntity]), UserModule],
  providers: [TagsService],
  controllers: [TagsController],
})
export class TagsModule {}
