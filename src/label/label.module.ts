import { LabelController } from './label.controller';
import { UserModule } from './../user/user.module';
import { LabelService } from './label.service';
import { LabelEntity } from './label.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([LabelEntity]), UserModule],
  providers: [LabelService],
  controllers: [LabelController],
})
export class LabelModule {}
