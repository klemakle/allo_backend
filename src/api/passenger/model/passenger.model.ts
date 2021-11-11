import * as mongoose from 'mongoose';

export const PassengerSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date,
  },
  updated_at: {
    type: Date,
    default: Date,
  },
});
