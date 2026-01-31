import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateTripDto {

    @IsString()
    @MinLength(3)
    @MaxLength(3)
    @ApiProperty({ example: 'MUC', description: 'The origin of the trip, IATA code' })
    origin: string;

    @IsString()
    @MinLength(3)
    @MaxLength(3)
    @ApiProperty({ example: 'FRA', description: 'The destination of the trip, IATA code' })
    destination: string;

    @IsNumber()
    @Min(1)
    @ApiProperty({ example: 1500, description: 'The cost of the trip' })
    cost: number;

    @IsNumber()
    @Min(1)
    @ApiProperty({ example: 30, description: 'The duration of the trip' })
    duration: number;

    @IsString()
    @ApiProperty({ example: 'flight', description: 'The type of transport of the trip' })
    type: string;

    @IsString()
    @ApiProperty({ example: 'from MUC to FRA by flight', description: 'The description of the trip' })
    display_name: string;
}