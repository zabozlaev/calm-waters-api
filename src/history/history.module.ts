import { HistoryEntity } from './history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([HistoryEntity])],
})
export class HistoryModule {}
