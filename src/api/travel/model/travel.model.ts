import * as mongoose from 'mongoose';

export const TravelSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  location: {
    type: String,
    trim: true,
    required: true,
  },
  tarif: {
    type: String,
    default: '0',
  },
});
