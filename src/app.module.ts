import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { DriverModule } from './api/driver/driver.module';
import { PassengerModule } from './api/passenger/passenger.module';
import { TravelModule } from './api/travel/travel.module';
import config from './config/env.config';
import databaseConfig from './config/database.config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config, databaseConfig] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongoUrl'),
        useCreateIndex: true,
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    DriverModule,
    PassengerModule,
    TravelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
