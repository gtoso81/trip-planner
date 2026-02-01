import { SortBy } from "../search/dto/search-dto";
import { TripDto } from "./dto/trip.dto";

export const sortData = (sort_by: SortBy, data: TripDto[]): TripDto[] => {
    const sortMap = {
        [SortBy.Fastest]: "duration",
        [SortBy.Cheapest]: "cost"
    };
    const prop = sortMap[sort_by];
    data.sort((a,b) => {
        return a[prop] - b[prop];
    });
    return data;
}