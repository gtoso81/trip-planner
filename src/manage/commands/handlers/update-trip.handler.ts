import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateTripCommand } from "../impl/update-trip.command";
import { NotFoundException } from "@nestjs/common";
import { TripDto } from "../../../common/dto/trip.dto";
import { TripMapper } from "../../trip-mapper";
import { TripRepository } from "../../trip.repository";

@CommandHandler(UpdateTripCommand)
export class UpdateTripHandler implements ICommandHandler<UpdateTripCommand> {
  constructor(private repository: TripRepository) {}

  async execute(command: UpdateTripCommand): Promise<TripDto> {
    const { id, updateTrip } = command;
    const result = await this.repository.update(id, updateTrip);

    if (!result) {
      throw new NotFoundException(`Trip ID ${id} not found`);
    }

    return TripMapper.toDto(result);
  }
}