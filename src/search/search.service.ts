import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TripDto } from '../common/dto/trip.dto';
import { SearchDto, SortBy } from './dto/search-dto';
import { Trip } from 'src/manage/schema/trip.schema';

@Injectable()
export class SearchService {
    constructor(private configService: ConfigService, private httpService: HttpService) {}

    getFromEnv(key:string) :string {
        const val = this.configService.get<string>(key);
         if (!val) {
            throw new Error(`No ${key} configured in .env`);
        }
        return val;
    }

    async getTrips(search:SearchDto):Promise<TripDto[]>{
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
        
        return this.sortData(sort_by, data);
    }

    sortData(sort_by:SortBy, data: TripDto[]): TripDto[] {
        const sortMap = {
            [SortBy.Fastest]: "duration",
            [SortBy.Cheapest]: "cost"
        };
        const prop = sortMap[sort_by];
        const sortedData = data.sort((a,b) => {
            return a[prop] -b[prop];
        })
        return sortedData;
    }
}
