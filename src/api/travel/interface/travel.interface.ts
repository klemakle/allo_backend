import { Document, ObjectId } from 'mongoose';

export interface Travel extends Document {
  destination: string;
  location: string;
  price: string;
  departureTime: Date;
  completed: boolean;
  isDeleted: boolean;
  driver: ObjectId;
  passengers: Array<ObjectId>;
  readonly created_at: Date;
  readonly updated_at: Date;
}