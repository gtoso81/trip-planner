import { Injectable, NotFoundException } from '@nestjs/common';
import { Trip } from './schema/trip.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { TripDto } from 'src/common/dto/trip.dto';

@Injectable()
export class ManageService {
    constructor(@InjectModel(Trip.name) private tripModel: Model<Trip>,) {}

    async create(createTrip: CreateTripDto): Promise<TripDto> {
        const trip = await this.tripModel.create(createTrip);
        return this.mapResponse(trip);
    }

    async findAll(): Promise<TripDto[]> {
        const trips = await this.tripModel.find().lean().exec();
        return trips.map((t) => this.mapResponse(t));
    }

    async findOne(id: string): Promise<TripDto> {
        const result = await this.tripModel.findById(id).lean().exec();
        if (!result) {
            throw new NotFoundException(`Trip ID ${id} not found`);
        }
        return this.mapResponse(result);
    }

    async update(id: string, updateTrip: UpdateTripDto): Promise<TripDto> {
        const result = await this.tripModel.findByIdAndUpdate(id, updateTrip, {new:true}).exec();
        if (!result) {
            throw new NotFoundException(`Trip ID ${id} not found`);
        }
        return this.mapResponse(result);
    }

    async delete(id: string): Promise<TripDto> {
        const result = await this.tripModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Trip ID ${id} not found`);
        }
        return this.mapResponse(result);
    }
    
    mapResponse(trip:Trip): TripDto {
        return {
            id: trip._id,
            origin: trip.origin,
            destination: trip.destination,
            cost: trip.cost,
            duration: trip.duration,
            type: trip.type,
            display_name: trip.display_name
        };
    }

}
