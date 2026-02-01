import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateTripCommand } from "../impl/create-trip.command";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TripDto } from "../../../common/dto/trip.dto";
import { Trip } from "../../schema/trip.schema";
import { TripMapper } from "../../trip-mapper";

@CommandHandler(CreateTripCommand)
export class CreateTripHandler implements ICommandHandler<CreateTripCommand> {
  constructor(@InjectModel(Trip.name) private tripModel: Model<Trip>) {}

  async execute(command: CreateTripCommand): Promise<TripDto> {
    const { createTrip } = command;
    const result = await this.tripModel.create(createTrip);
    return TripMapper.toDto(result);
  }
}