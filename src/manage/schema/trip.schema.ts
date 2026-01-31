import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TripDocument = HydratedDocument<Trip>;

@Schema({ 
  toJSON: { 
    virtuals: true, 
    versionKey: false,
    transform: (_, obj) => {
      const { _id, ...rest } = obj;
      return rest;
    },
  } 
})
export class Trip {

    @Prop({ required: true })
    origin: string;

    @Prop({ required: true })
    destination: string;

    @Prop({ required: true })
    cost: number;

    @Prop({ required: true })
    duration: number;

    @Prop({ required: true })
    type: string;
    
    @Prop({ required: true })
    display_name: string;
}

export const TripSchema = SchemaFactory.createForClass(Trip);