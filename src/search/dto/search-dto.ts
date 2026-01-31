import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {IsString, IsEnum, IsIn, IsOptional } from 'class-validator';

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
    @ApiProperty({ example: 'MUC', description: 'The origin of the trip, IATA code' })
    origin: string;

    @IsString()
    @IsIn(ALLOWED_IATA)
    @ApiProperty({ example: 'FRA', description: 'The destination of the trip, IATA code' })
    destination: string;

    @IsEnum(SortBy)
    @ApiPropertyOptional({ example: 'fastest', description: 'The desired sorting method for the trips' })
    @IsOptional()
    sort_by: SortBy;
}
