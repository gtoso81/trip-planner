import { Injectable, NotFoundException } from '@nestjs/common';
import { Trip } from './schema/trip.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Injectable()
export class ManageService {
    constructor(@InjectModel(Trip.name) private tripModel: Model<Trip>,) {}

    create(createTrip: CreateTripDto): Promise<Trip> {
        return this.tripModel.create(createTrip);
    }

    findAll(): Promise<Trip[]> {
        return this.tripModel.find().exec();
    }

    async delete(id: string): Promise<Trip> {
        const result = await this.tripModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Trip ID ${id} not found`);
        }
        return result;
    }

    async findOne(id: string): Promise<Trip> {
        const result = await this.tripModel.findById(id).exec();
        if (!result) {
            throw new NotFoundException(`Trip ID ${id} not found`);
        }
        return result;
    }

    async update(id: string, updateTrip: UpdateTripDto): Promise<Trip> {
        const result = await this.tripModel.findByIdAndUpdate(id, updateTrip, {new:true}).exec();
        if (!result) {
            throw new NotFoundException(`Trip ID ${id} not found`);
        }
        return result;
    }

}
