import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TripDto } from "../../../common/dto/trip.dto";
import { Trip } from "../../schema/trip.schema";
import { TripMapper } from "../../trip-mapper";
import { FindOneTripQuery } from "../impl/find-one-trip.query";
import { NotFoundException } from "@nestjs/common";

@QueryHandler(FindOneTripQuery)
export class FindOneTripHandler implements IQueryHandler<FindOneTripQuery> {
  constructor(@InjectModel(Trip.name) private tripModel: Model<Trip>) {}

  async execute(query: FindOneTripQuery): Promise<TripDto> {
    const { id } = query;
    const result = await this.tripModel.findById(id).lean().exec();
    if (!result) {
        throw new NotFoundException(`Trip ID ${id} not found`);
    }
    return TripMapper.toDto(result);
  }
}