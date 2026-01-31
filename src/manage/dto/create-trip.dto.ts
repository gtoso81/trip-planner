import { IsNumber, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateTripDto {

    @IsString()
    @MinLength(3)
    @MaxLength(3)
    origin: string;

    @IsString()
    @MinLength(3)
    @MaxLength(3)
    destination: string;

    @IsNumber()
    @Min(1)
    cost: number;

    @IsNumber()
    @Min(1)
    duration: number;

    @IsString()
    type: string;

    @IsString()
    display_name: string;
}