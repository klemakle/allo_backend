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
  price: {
    type: String,
    default: '0',
  },
  departureTime: {
    type: Date,
    default: Date,
    index: true,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'driver',
  },
  passenger: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'passenger',
    },
  ],
  completed: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date,
  },
  updated: {
    type: Date,
    default: Date,
  },
});
