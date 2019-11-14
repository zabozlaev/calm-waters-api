import { entities } from './shared/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PipelineModule } from './pipeline/pipeline.module';
import { StageModule } from './stage/stage.module';
import { DealModule } from './deal/deal.module';
import { LabelModule } from './label/label.module';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME || 'test',
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD,
      synchronize: true,
      keepConnectionAlive: true,
      entities,
    }),
    UserModule,
    AuthModule,
    PipelineModule,
    StageModule,
    DealModule,
    LabelModule,
    HistoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
