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
  img: {
    type: String,
  },
  desc: {
    type: String,
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
    //required: [true, "Hotel ID is required"],
  },
  extras: {
    type: String,
  },
  totalPrice: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
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