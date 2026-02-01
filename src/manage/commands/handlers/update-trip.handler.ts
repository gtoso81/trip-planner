import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateTripCommand } from "../impl/update-trip.command";
import { NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TripDto } from "../../../common/dto/trip.dto";
import { Trip } from "../../schema/trip.schema";
import { TripMapper } from "../../trip-mapper";

@CommandHandler(UpdateTripCommand)
export class UpdateTripHandler implements ICommandHandler<UpdateTripCommand> {
  constructor(@InjectModel(Trip.name) private tripModel: Model<Trip>) {}

  async execute(command: UpdateTripCommand): Promise<TripDto> {
    const { id, updateTrip } = command;
    const result = await this.tripModel.findByIdAndUpdate(id, updateTrip, { new: true }).exec();

    if (!result) {
      throw new NotFoundException(`Trip ID ${id} not found`);
    }

    return TripMapper.toDto(result);
  }
}