import { CreateTripDto } from "../../dto/create-trip.dto";

export class CreateTripCommand {
  constructor(public createTrip: CreateTripDto) {}
}