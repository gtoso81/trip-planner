import { UpdateTripDto } from "../../dto/update-trip.dto";

export class UpdateTripCommand {
  constructor(public id: string,public updateTrip: UpdateTripDto) {}
}