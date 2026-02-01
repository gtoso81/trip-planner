import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { TripDto } from "../../../common/dto/trip.dto";
import { TripMapper } from "../../trip-mapper";
import { FindOneTripQuery } from "../impl/find-one-trip.query";
import { NotFoundException } from "@nestjs/common";
import { TripRepository } from "../../trip.repository";

@QueryHandler(FindOneTripQuery)
export class FindOneTripHandler implements IQueryHandler<FindOneTripQuery> {
  constructor(private repository: TripRepository) {}

  async execute(query: FindOneTripQuery): Promise<TripDto> {
    const { id } = query;
    const result = await this.repository.findById(id);
    if (!result) {
        throw new NotFoundException(`Trip ID ${id} not found`);
    }
    return TripMapper.toDto(result);
  }
}