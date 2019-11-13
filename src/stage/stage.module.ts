import { StageEntity } from './stage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([StageEntity])],
})
export class StageModule {}
