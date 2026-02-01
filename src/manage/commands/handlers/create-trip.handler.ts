import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateTripCommand } from "../impl/create-trip.command";
import { TripDto } from "../../../common/dto/trip.dto";
import { TripMapper } from "../../trip-mapper";
import { TripRepository } from "../../trip.repository";

@CommandHandler(CreateTripCommand)
export class CreateTripHandler implements ICommandHandler<CreateTripCommand> {
  constructor(private repository: TripRepository) {}

  async execute(command: CreateTripCommand): Promise<TripDto> {
    const { createTrip } = command;
    const result = await this.repository.create(createTrip);
    return TripMapper.toDto(result);
  }
}