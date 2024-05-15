import mongoose, {Schema} from "mongoose";

const EventSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "The name is required"],
  },
  date: {
    type: Date,
    required: [true, "The date is required"],
  },
  checkIn: {
    type: Date,
    required: [true, "Check in date is required"],
  },
  checkOut: {
    type: Date,
    required: [true, "Check out date is required"],
  },
  price: {
    type: Number,
    required: [true, "The price is required"],
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
  hotel: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
    //required: [true, "Hotel ID is required"],
  },
  recurses: {
    type: [
      {
          type: Schema.Types.ObjectId,
          ref : "Recurses"
      }
  ]
  }
});

EventSchema.methods.addRecurseById = async function(recurseId){
    this.recurses.push(recurseId);
    await this.save();
}


EventSchema.methods.toJSON = function(){
  const { __v, _id, ...event_} = this.toObject();
  event_.uid = _id;
  return event_;
}

export default mongoose.model("Event", EventSchema);