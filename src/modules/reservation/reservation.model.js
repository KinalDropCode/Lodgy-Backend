import { Schema, model } from "mongoose";

const ReservationSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
    required: [true, "Hotel ID is required"],
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: [true, "Room ID is required"],
  },
  checkIn: {
    type: Date,
    required: [true, "Check in date is required"],
  },
  checkOut: {
    type: Date,
    required: [true, "Check out date is required"],
  },
  totalPrice: {
    type: Number,
    required: [true, "Total price is required"],
  },
  observation: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
});
