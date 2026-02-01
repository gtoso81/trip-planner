import { CreateTripHandler } from './create-trip.handler';
import { UpdateTripHandler } from './update-trip.handler';
import { DeleteTripHandler } from './delete-trip.handler';

export const CommandHandlers = [
  CreateTripHandler, 
  UpdateTripHandler, 
  DeleteTripHandler
];