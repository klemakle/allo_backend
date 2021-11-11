import { Document } from 'mongoose';

export interface Passenger extends Document {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  phone: string;
  readonly created_at: string;
  readonly updated_at: string;
}
