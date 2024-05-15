import mongose, { Schema } from "mongoose";

const RecurseSchema = mongose.Schema({
    name: {
        type:  String,
        required: [true, "The name of the recurse is obligatory"]
    },
    description:{
        type: String,
        required: [true, "The description is obligatory"]
    },
    price: {
        type: Number,
        required: [true, "The price is required"],
      },
      hotel: {
        type: Schema.Types.ObjectId,
        ref: "Hotel",
      },
    status: {
        type: Boolean,
        default: true
    }
})

export default mongose.model("Recurses", RecurseSchema);