import { Schema, model } from "mongoose";

const RoomSchema = Schema({
  type: {
    type: String,
    required: [true, "The type is required"],
  },
  price: {
    type: Number,
    required: [true, "The price is required"],
  },
  desc: {
    type: String,
  },
  availability: {
    cuantity: NumberInt,
    required: [true, "The availability is required"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  capacity: {
    type: NumberInt,
    required: [true, "The capacity is required"],
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
    required: [true, "Hotel ID is required"],
  },
});

export default model("Room", RoomSchema);