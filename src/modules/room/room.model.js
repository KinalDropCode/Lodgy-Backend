import { Schema, model } from "mongoose";

const RoomSchema = Schema({
  numberRoom: {
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
    type: String,
    required: true,
    enum: ["ENABLED", "DISABLED"],
  },
  capacity: {
    type: Number,
    required: [true, "The capacity is required"],
  },
  img: [{
    type: String,
  }],
  hotel: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
  },
  status: {
    type: Boolean,
    default: true,
  },
});

RoomSchema.methods.addRecurseById = async function (recurseId) {
  this.recurses.push(recurseId);
  await this.save();
}

RoomSchema.methods.toJSON = function () {
  const { __v, _id, ...resto } = this.toObject();
  resto.uid = _id;
  return resto;
};

export default model("Room", RoomSchema);