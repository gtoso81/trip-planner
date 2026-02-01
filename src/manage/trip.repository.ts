import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trip } from './schema/trip.schema';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Injectable()
export class TripRepository {
  constructor(@InjectModel(Trip.name) private tripModel: Model<Trip>) {}

  async create(data: CreateTripDto): Promise<Trip> {
    return await this.tripModel.create(data);
  }

  async findAll(): Promise<Trip[]> {
    return await this.tripModel.find().lean().exec();
  }

  async findById(id: string): Promise<Trip | null> {
    return await this.tripModel.findById(id).lean().exec();
  }

  async update(id: string, data: UpdateTripDto): Promise<Trip | null> {
    return await this.tripModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Trip | null> {
    return await this.tripModel.findByIdAndDelete(id).exec();
  }
}