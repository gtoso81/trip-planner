import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TripDocument = HydratedDocument<Trip>;

@Schema()
export class Trip {

    @Prop({ required: true })
    origin: string;

    @Prop({ required: true })
    destination: string;

    @Prop()
    cost: number;

    @Prop()
    duration: number;

    @Prop()
    type: string;
    
    @Prop()
    display_name: string;
}

export const TripSchema = SchemaFactory.createForClass(Trip);