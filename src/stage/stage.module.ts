import { StageEntity } from './stage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StageService } from './stage.service';
import { UserModule } from '../user/user.module';
import { PipelineModule } from '../pipeline/pipeline.module';
import { StageController } from './stage.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([StageEntity]),
    UserModule,
    PipelineModule,
  ],
  providers: [StageService],
  controllers: [StageController],
})
export class StageModule {}
