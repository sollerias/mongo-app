import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NameDocument = Name & Document;

@Schema()
export class Name {
  @Prop({ required: true })
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  name: string;
}

export const NameSchema = SchemaFactory.createForClass(Name);
NameSchema.index({ name: 'text' });
