import { PipelineEntity } from './pipeline.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([PipelineEntity])],
})
export class PipelineModule {}
