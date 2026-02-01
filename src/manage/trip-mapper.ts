import { Trip } from './schema/trip.schema';
import { TripDto } from 'src/common/dto/trip.dto';

export class TripMapper {
  static toDto(trip: Trip): TripDto {
    return {
      id: trip._id, 
      origin: trip.origin,
      destination: trip.destination,
      cost: trip.cost,
      duration: trip.duration,
      type: trip.type,
      display_name: trip.display_name,
    };
  }
}