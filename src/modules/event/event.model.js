import mongoose, { Schema } from "mongoose";

const EventSchema = new Schema({
  idUser: {
    type: String,
    required: [true, "The user ID is required"],
  },
  tipoEvento: {
    type: String,
    required: [true, "The event type is required"],
    enum: ["Conference", "Wedding", "Party", "Meeting", "Workshop"],
  },
  desc: {
    type: String,
  },
  date: {
    type: Date,
    required: [true, "The date is required"],
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
  },
  extras: {
    type: [String], 
  },
  total: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

EventSchema.methods.addRecurseById = async function(recurseId) {
  this.recurses.push(recurseId);
  await this.save();
}

EventSchema.methods.toJSON = function() {
  const { __v, _id, ...event_ } = this.toObject();
  event_.uid = _id;
  return event_;
}

export default mongoose.model("Event", EventSchema);