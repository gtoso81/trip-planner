import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TripDto } from "../../../common/dto/trip.dto";
import { Trip } from "../../schema/trip.schema";
import { TripMapper } from "../../trip-mapper";
import { FindAllTripsQuery } from "../impl/find-all-trips.query";

@QueryHandler(FindAllTripsQuery)
export class FindAllTripsHandler implements IQueryHandler<FindAllTripsQuery> {
  constructor(@InjectModel(Trip.name) private tripModel: Model<Trip>) {}

  async execute(query: FindAllTripsQuery): Promise<TripDto[]> {
    const trips = await this.tripModel.find().lean().exec();
    return trips.map(trip => TripMapper.toDto(trip));
  }
}