import { Schema, model } from "mongoose";

const HotelSchema = Schema({
  name: {
    type: String,
    required: [true, "The name is required"],
  },
  address: {
    type: String,
    required: [true, "The address is required"],
  },
  phone: {
    type: String,
    required: [true, "The phone is required"],
  },
  email: {
    type: String,
    required: [true, "The email is required"],
  },
  img: {
    type: String,
  },
  desc: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  rooms: [
    {
      ref: "Room",
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

export default model("Hotel", HotelSchema);