import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ManageService } from './manage.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Controller('manage')
export class ManageController {
    constructor(private manageService: ManageService) {}

    @Post()
    save(@Body() createTrip: CreateTripDto) {
        return this.manageService.save(createTrip);
    }

    @Get()
    list() {
        return this.manageService.list();
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.manageService.delete(id);
    }

    @Get(':id')
    get(@Param('id') id: string) {
        return this.manageService.get(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateTrip: UpdateTripDto) {
        return this.manageService.update(id, updateTrip);
    }
}
