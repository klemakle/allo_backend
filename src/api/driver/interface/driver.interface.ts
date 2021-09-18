import { Document } from 'mongoose';

export interface Driver extends Document {
  firstname: string;
  lastname: string;
  phone: string;
  password: string;
  readonly created_at: Date;
  readonly updated_at: Date;
}
