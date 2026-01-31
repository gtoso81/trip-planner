import { ApiProperty } from "@nestjs/swagger";

export class TripDto {
   @ApiProperty({ description: 'The origin of the trip' })
    origin: string;
  
    @ApiProperty({ description: 'The destination of the trip' })
    destination: string;
  
    @ApiProperty({ description: 'The cost of the trip' })
    cost: number;
  
    @ApiProperty({ description: 'The duration of the trip' })
    duration: number;
  
    @ApiProperty({ description: 'The type of transfer of the trip' })
    type: string;
  
    @ApiProperty({ description: 'The description of the trip' })
    display_name: string;
  
    @ApiProperty({ description: 'The id of the trip' })
    id: string; 
}