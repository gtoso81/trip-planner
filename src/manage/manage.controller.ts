import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { TripDto } from '../common/dto/trip.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UpdateTripCommand } from './commands/impl/update-trip.command';
import { DeleteTripCommand } from './commands/impl/delete-trip.command';
import { CreateTripCommand } from './commands/impl/create-trip.command';
import { FindAllTripsQuery } from './queries/impl/find-all-trips.query';
import { FindOneTripQuery } from './queries/impl/find-one-trip.query';

@ApiTags('trips')
@Controller('manage')
export class ManageController {
    constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

    @Post()
    @ApiOperation({ summary: 'Create a new trip' })
    @ApiCreatedResponse({description: 'Trip created successfully', type: TripDto})
    @ApiBadRequestResponse({description: 'Bad request'})
    create(@Body() createTrip: CreateTripDto) {
        return this.commandBus.execute(new CreateTripCommand(createTrip));
    }

    @Get()
    @ApiOperation({ summary: 'Get all saved trips' })
    @ApiOkResponse({description: 'Returned all saved trips', type: [TripDto]})
    @ApiBadRequestResponse({description: 'Bad request'})
    findAll() {
        return this.queryBus.execute(new FindAllTripsQuery());
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a trip' })
    @ApiOkResponse({description: 'Returned the requested trip', type: TripDto})
    @ApiBadRequestResponse({description: 'Bad request'})
    @ApiNotFoundResponse({description: 'Requested trip not found'})
    findOne(@Param('id', ParseObjectIdPipe) id: string) {
        return this.queryBus.execute(new FindOneTripQuery(id));
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a trip, the body in the request contains all the fields that have to be updated' })
    @ApiOkResponse({description: 'Updated the requested trip', type: TripDto})
    @ApiBadRequestResponse({description: 'Bad request'})
    @ApiNotFoundResponse({description: 'Requested trip not found'})
    update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateTrip: UpdateTripDto) {
        return this.commandBus.execute(new UpdateTripCommand(id, updateTrip));
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a trip' })
    @ApiOkResponse({description: 'Deleted the requested trip', type: TripDto})
    @ApiBadRequestResponse({description: 'Bad request'})
    @ApiNotFoundResponse({description: 'Requested trip not found'})
    delete(@Param('id', ParseObjectIdPipe) id: string) {
        return this.commandBus.execute(new DeleteTripCommand(id));
    }
}
