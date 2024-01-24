import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import appConfig from '../config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.get<'mysql'>('app.database.type'),
          host: configService.get('app.database.host'),
          port: configService.get<number>('app.database.port'),
          username: configService.get('app.database.username'),
          password: configService.get('app.database.password'),
          database: configService.get('app.database.database'),
          synchronize: configService.get<boolean>('app.database.synchronize'),
          autoLoadEntities: configService.get<boolean>('app.database.autoLoadEntities'),
        } as TypeOrmModuleOptions),
      inject: [ConfigService],
    }),
    UsersModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
