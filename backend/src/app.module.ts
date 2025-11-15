import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity'
import { Product } from './products/entities/product.entity';
import {TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

import { AuthService } from './auth/auth.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule, UsersModule
      ],      
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        // trustServerCertificate: true,
        return {
          type: 'mssql',
          host: configService.get<string>('DB_HOST'),
          port: 1433,
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          options: {
            encrypt: true,
            trustServerCertificate: true,
          },          
          entities: [User, Product],
          synchronize: true,
        }
      },
      inject: [ConfigService],      
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}

