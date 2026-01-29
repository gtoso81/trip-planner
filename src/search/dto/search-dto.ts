import {IsString, IsEnum, IsIn } from 'class-validator';

const ALLOWED_IATA = [
    "ATL", "PEK", "LAX", "DXB", "HND", "ORD", "LHR", "PVG", "CDG", "DFW",
    "AMS", "FRA", "IST", "CAN", "JFK", "SIN", "DEN", "ICN", "BKK", "SFO",
    "LAS", "CLT", "MIA", "KUL", "SEA", "MUC", "EWR", "MAD", "HKG", "MCO",
    "PHX", "IAH", "SYD", "MEL", "GRU", "YYZ", "LGW", "BCN", "MAN", "BOM",
    "DEL", "ZRH", "SVO", "DME", "JNB", "ARN", "OSL", "CPH", "HEL", "VIE"
];

export enum SortBy {
    Fastest = "fastest",
    Cheapest = "cheapest"
}

export class SearchDto {
    @IsString()
    @IsIn(ALLOWED_IATA)
    origin: string;

    @IsString()
    @IsIn(ALLOWED_IATA)
    destination: string;

    @IsEnum(SortBy)
    sort_by: SortBy;
}
