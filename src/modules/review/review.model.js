import { Schema, model } from "mongoose";

const ReviewSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  date: {
    type: Date,
    default: Date.now,
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
    required: [true, "Hotel ID is required"],
  },
  review: {
    type: String,
    required: [true, "The review is required"],
  },
  img: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

ReviewSchema.methods.toJSON = function () {
  const { __v, _id, ...resto } = this.toObject();
  resto.uid = _id;
  return resto;
};

export default model("Review", ReviewSchema);
