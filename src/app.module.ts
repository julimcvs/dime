import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import databaseConfiguration from './config/database/database.config';
import * as redisStore from 'cache-manager-redis-store';
import { BillModule } from './modules/bill/bill.module';
import { ExpenseModule } from './modules/expense/expense.module';
import { CategoryModule } from './modules/category/category.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { SallaryModule } from './modules/sallary/sallary.module';
import { EmailModule } from './modules/email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfiguration],
    }),
    CacheModule.register({
      store: redisStore,
      isGlobal: true,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
    BullModule.forRootAsync({
      useFactory: () => ({
        redis: {
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT),
        },
      }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (): TypeOrmModuleOptions => ({
        ...databaseConfiguration(),
      }),
    }),

    // App Modules
    BillModule,
    CategoryModule,
    ExpenseModule,
    AuthModule,
    UserModule,
    SallaryModule,
    EmailModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: CacheInterceptor,
  }],
})
export class AppModule {
}
