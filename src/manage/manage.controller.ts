import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ManageService } from './manage.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Controller('manage')
export class ManageController {
    constructor(private manageService: ManageService) {}

    @Post()
    create(@Body() createTrip: CreateTripDto) {
        return this.manageService.create(createTrip);
    }

    @Get()
    findAll() {
        return this.manageService.findAll();
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.manageService.delete(id);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.manageService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateTrip: UpdateTripDto) {
        return this.manageService.update(id, updateTrip);
    }
}
