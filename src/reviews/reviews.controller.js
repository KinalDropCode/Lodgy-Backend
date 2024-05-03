import hotelModel from "../modules/hotel/hotel.model.js";
import reviewModel from "../modules/review/review.model.js";

export const reviewPut = async (req, res) => {
  const { id } = req.params;
  const { review } = req.body;
  const allowed = req.user;
  const reviewUser = await reviewModel.findById(id);

  if (reviewUser.userId.toString() !== allowed.id) {
    return res.status(400).send("You cant delete this review");
  }
  try {
    await reviewModel.findByIdAndUpdate(id, { review });
    res.status(200).json({
      msg: "Updated review",
    });
  } catch (e) {
    res.status(500).json({
      msg: "Error adding",
      error: e.message,
    });
  }
};

export const reviewPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { review } = req.body;
    const allowed = req.user;
    const reviiws = new reviewModel({
      review: review,
      hotel: allowed.id,
    });
    await reviiws.save();

    const reviewConstII = await hotelModel.findById(id);

    await reviewConstII.addCommentById(reviiws._id);

    res.status(200).json({
      msg: "Succes",
      reviiws,
    });
  } catch (e) {
    res.status(500).json({
      msg: "Error adding",
      error: e.message,
    });
  }
};

export const reviewDelete = async (req, res) => {
  const { id } = req.params;
  const allowed = req.user;
  const userReview = await reviewModel.findById(id);

  if (userReview.userId.toString() !== allowed.id) {
    return res.status(400).send("You can't delete this comment");
  }
  try {
    await reviewModel.findByIdAndUpdate(id, {
      status: false,
    });
    res.status(200).json({
      msg: "Deleted review",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error deleting review",
      error: error.message,
    });
  }
};
