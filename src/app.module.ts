import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './search/search.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ManageModule } from './manage/manage.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    SearchModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ManageModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
