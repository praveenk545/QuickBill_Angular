import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { RegisterModule } from './register/register.module';
import { Register } from './register/entities/register.entity';

import { ItemsModule } from './items/items.module';
import { Item } from './items/entities/item.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    MulterModule.register({
      dest: './files',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'postgres',
      entities: [Register,Item],
      synchronize: true,
    }),
    RegisterModule,
    ItemsModule,

  ],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
