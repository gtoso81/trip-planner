import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteTripCommand } from "../impl/delete-trip.command";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TripDto } from "../../../common/dto/trip.dto";
import { Trip } from "../../schema/trip.schema";
import { TripMapper } from "../../trip-mapper";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(DeleteTripCommand)
export class DeleteTripHandler implements ICommandHandler<DeleteTripCommand> {
  constructor(@InjectModel(Trip.name) private tripModel: Model<Trip>) {}

  async execute(command: DeleteTripCommand): Promise<TripDto> {
    const { id } = command;
    const result = await this.tripModel.findByIdAndDelete(id).exec();
    if (!result) {
        throw new NotFoundException(`Trip ID ${id} not found`);
    }
    return TripMapper.toDto(result);
  }
}