import { SearchDto, SortBy } from "./dto/search-dto";
import { TripDto } from "../common/dto/trip.dto";

export const mockTrips: TripDto[] = [{
    origin: "MUC",
    destination: "FRA",
    cost: 4682,
    duration: 27,
    type: "flight",
    id: "3328ded1-b99e-42c0-bf40-cf352459fc02",
    display_name: "from MUC to FRA by train"
},
{
    origin: "MUC",
    destination: "FRA",
    cost: 4816,
    duration: 41,
    type: "train",
    id: "59533b8e-3aae-4351-8bb6-894959580529",
    display_name: "from MUC to FRA by train"
},
{
    origin: "MUC",
    destination: "FRA",
    cost: 2200,
    duration: 14,
    type: "train",
    id: "e5ca4486-00b9-438b-b665-479bc60abd28",
    display_name: "from MUC to FRA by train"
},
{
    origin: "MUC",
    destination: "FRA",
    cost: 2004,
    duration: 17,
    type: "train",
    id: "b4a0fa65-a64f-4f63-89d9-ff22a97a91ee",
    display_name: "from MUC to FRA by train"
}];


export const mockTripsSortedByFastest: TripDto[] = [
{
    origin: "MUC",
    destination: "FRA",
    cost: 2200,
    duration: 14,
    type: "train",
    id: "e5ca4486-00b9-438b-b665-479bc60abd28",
    display_name: "from MUC to FRA by train"
},
{
    origin: "MUC",
    destination: "FRA",
    cost: 2004,
    duration: 17,
    type: "train",
    id: "b4a0fa65-a64f-4f63-89d9-ff22a97a91ee",
    display_name: "from MUC to FRA by train"
},
{
    origin: "MUC",
    destination: "FRA",
    cost: 4682,
    duration: 27,
    type: "flight",
    id: "3328ded1-b99e-42c0-bf40-cf352459fc02",
    display_name: "from MUC to FRA by train"
},
{
    origin: "MUC",
    destination: "FRA",
    cost: 4816,
    duration: 41,
    type: "train",
    id: "59533b8e-3aae-4351-8bb6-894959580529",
    display_name: "from MUC to FRA by train"
}];

export const mockTripsSortedByCheapest: TripDto[] = [{
    origin: "MUC",
    destination: "FRA",
    cost: 2004,
    duration: 17,
    type: "train",
    id: "b4a0fa65-a64f-4f63-89d9-ff22a97a91ee",
    display_name: "from MUC to FRA by train"
},
{
    origin: "MUC",
    destination: "FRA",
    cost: 2200,
    duration: 14,
    type: "train",
    id: "e5ca4486-00b9-438b-b665-479bc60abd28",
    display_name: "from MUC to FRA by train"
},
{
    origin: "MUC",
    destination: "FRA",
    cost: 4682,
    duration: 27,
    type: "flight",
    id: "3328ded1-b99e-42c0-bf40-cf352459fc02",
    display_name: "from MUC to FRA by train"
},
{
    origin: "MUC",
    destination: "FRA",
    cost: 4816,
    duration: 41,
    type: "train",
    id: "59533b8e-3aae-4351-8bb6-894959580529",
    display_name: "from MUC to FRA by train"
}];

export const mockSearch: SearchDto = {origin:'MUC', destination:'FRA'};