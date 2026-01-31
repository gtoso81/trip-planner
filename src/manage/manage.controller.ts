import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ManageService } from './manage.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { TripDto } from '../common/dto/trip.dto';

@ApiTags('trips')
@Controller('manage')
export class ManageController {
    constructor(private manageService: ManageService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new trip' })
    @ApiCreatedResponse({description: 'Trip created successfully', type: TripDto})
    @ApiBadRequestResponse({description: 'Bad request'})
    create(@Body() createTrip: CreateTripDto) {
        return this.manageService.create(createTrip);
    }

    @Get()
    @ApiOperation({ summary: 'Get all saved trips' })
    @ApiOkResponse({description: 'Returned all saved trips', type: [TripDto]})
    @ApiBadRequestResponse({description: 'Bad request'})
    findAll() {
        return this.manageService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a trip' })
    @ApiOkResponse({description: 'Returned the requested trip', type: TripDto})
    @ApiBadRequestResponse({description: 'Bad request'})
    @ApiNotFoundResponse({description: 'Requested trip not found'})
    findOne(@Param('id', ParseObjectIdPipe) id: string) {
        return this.manageService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a trip, the body in the request contains all the fields that have to be updated' })
    @ApiOkResponse({description: 'Updated the requested trip', type: TripDto})
    @ApiBadRequestResponse({description: 'Bad request'})
    @ApiNotFoundResponse({description: 'Requested trip not found'})
    update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateTrip: UpdateTripDto) {
        return this.manageService.update(id, updateTrip);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a trip' })
    @ApiOkResponse({description: 'Deleted the requested trip', type: TripDto})
    @ApiBadRequestResponse({description: 'Bad request'})
    @ApiNotFoundResponse({description: 'Requested trip not found'})
    delete(@Param('id', ParseObjectIdPipe) id: string) {
        return this.manageService.delete(id);
    }
}
