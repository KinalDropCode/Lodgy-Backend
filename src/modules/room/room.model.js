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
  availability: [{
    type: Number,  // Specify the type of each element in the array
    required: [true, "The availability date is required"],
  }],
  status: {
    type: Boolean,
    default: true,
  },
  capacity: {
    type: Number,
    required: [true, "The capacity is required"],
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
  },
});

RoomSchema.methods.addRecurseById = async function(recurseId){
  this.recurses.push(recurseId);
  await this.save();
}

RoomSchema.methods.toJSON = function () {
  const { __v, _id, ...resto } = this.toObject();
  resto.uid = _id;
  return resto;
};

export default model("Room", RoomSchema);