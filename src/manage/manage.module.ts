import { Module } from '@nestjs/common';
import { ManageController } from './manage.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Trip, TripSchema } from './schema/trip.schema';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { TripRepository } from './trip.repository';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Trip.name, schema: TripSchema }])
  ],
  controllers: [ManageController],
  providers:[
    ...CommandHandlers,
    ...QueryHandlers,
    TripRepository
  ]
})
export class ManageModule {}
