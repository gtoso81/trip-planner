import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { TripDto } from "../../../common/dto/trip.dto";
import { TripMapper } from "../../trip-mapper";
import { FindAllTripsQuery } from "../impl/find-all-trips.query";
import { TripRepository } from "../../trip.repository";

@QueryHandler(FindAllTripsQuery)
export class FindAllTripsHandler implements IQueryHandler<FindAllTripsQuery> {
  constructor(private repository: TripRepository) {}

  async execute(query: FindAllTripsQuery): Promise<TripDto[]> {
    const trips = await this.repository.findAll();
    return trips.map(trip => TripMapper.toDto(trip));
  }
}