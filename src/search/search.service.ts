import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TripDto } from '../common/dto/trip.dto';
import { SearchDto } from './dto/search-dto';
import { sortData } from '../common/utils';

@Injectable()
export class SearchService {
    constructor(private configService: ConfigService, private httpService: HttpService) {}

    private readonly logger = new Logger(SearchService.name);

    getFromEnv(key:string) :string {
        const val = this.configService.get<string>(key);
         if (!val) {
            throw new Error(`No ${key} configured in .env`);
        }
        return val;
    }

    async getTrips(search:SearchDto): Promise<TripDto[]> {
        try {
            const searchUrl = this.getFromEnv('SEARCH_URL');
            const xApiKey = this.getFromEnv('X_API_KEY');

            const {origin, destination, sort_by} = search;
            
            const { data } = await firstValueFrom(
                this.httpService.get(searchUrl, {
                    params: {
                        origin,
                        destination
                    },
                    headers: {
                        'x-api-key': xApiKey
                    }
                })
            );
            
            return sort_by ? sortData(sort_by, data) : data;
        } catch (err) {
            this.logger.error(`error during trips serch: ${err.message}`);
            throw new Error('Error while invoking trips search', err);
        }
    }
}
