import { Module } from '@nestjs/common';
import { TravelService } from './travel.service';
import { TravelController } from './travel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TravelSchema } from './model/travel.model';
import { DriverSchema } from '../driver/model/driver.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Travel', schema: TravelSchema },
      { name: 'Driver', schema: DriverSchema },
    ]),
  ],
  controllers: [TravelController],
  providers: [TravelService],
})
export class TravelModule {}
