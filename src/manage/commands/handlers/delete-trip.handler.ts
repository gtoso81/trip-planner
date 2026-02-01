import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteTripCommand } from "../impl/delete-trip.command";
import { TripDto } from "../../../common/dto/trip.dto";
import { TripMapper } from "../../trip-mapper";
import { NotFoundException } from "@nestjs/common";
import { TripRepository } from "../../trip.repository";

@CommandHandler(DeleteTripCommand)
export class DeleteTripHandler implements ICommandHandler<DeleteTripCommand> {
  constructor(private repository: TripRepository) {}

  async execute(command: DeleteTripCommand): Promise<TripDto> {
    const { id } = command;
    const result = await this.repository.delete(id);
    if (!result) {
        throw new NotFoundException(`Trip ID ${id} not found`);
    }
    return TripMapper.toDto(result);
  }
}