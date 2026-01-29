import { Controller, Get, Param, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchDto } from './dto/search-dto';

@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}
    
    @Get()
    getTrips(@Query() search: SearchDto) {
        return this.searchService.getTrips(search);
    }
}
