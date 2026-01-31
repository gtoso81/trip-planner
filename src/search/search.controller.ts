import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchDto } from './dto/search-dto';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('trips')
@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}
    
    @Get()
    @ApiOperation({ summary: 'Search the trips' })
    @ApiOkResponse({description: 'Search successful'})
    @ApiInternalServerErrorResponse({description: 'Internal error in calling search service'})
    @ApiBadRequestResponse({description: 'Bad request'})
    getTrips(@Query() search: SearchDto) {
        return this.searchService.getTrips(search);
    }
}
