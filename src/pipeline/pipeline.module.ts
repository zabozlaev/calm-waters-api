import { PipelineController } from './pipeline.controller';
import { PipelineService } from './pipeline.service';
import { UserModule } from './../user/user.module';
import { PipelineEntity } from './pipeline.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([PipelineEntity]), UserModule],
  providers: [PipelineService],
  controllers: [PipelineController],
})
export class PipelineModule {}
