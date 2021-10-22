import { Document } from 'mongoose';

export interface Passenger extends Document {
  phone: string;
  readonly created_at: string;
  readonly updated_at: string;
}
