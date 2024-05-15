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
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
  ],
  reviews: {
   type:[
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ]
  },
  events:{
    type:[
      {
        type: Schema.Types.ObjectId,
        ref: "Event"
      }
    ]
  }
});

HotelSchema.methods.addEventById = async function(eventId){
  this.events.push(eventId);
  await this.save();
}

HotelSchema.methods.addCommentById = async function (reviewId) { 
  this.reviews.push(reviewId);
  await this.save();
}

export default model("Hotel", HotelSchema);