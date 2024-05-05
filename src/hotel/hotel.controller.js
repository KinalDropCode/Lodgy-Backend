import hotelModel from "../modules/hotel/hotel.model.js";

export const searchHotelByName = async (req, res) => {
  try {
    const { name } = req.body;
    const allowed = req.user;
/*
    if (allowed.role !== "ADMIN_ROLE") {
      return res.status(403).send("You cannot access this function");
    }
  */
    const hotel = await hotelModel.findOne({ name });

    if (!hotel) {
      return res.status(404).send("Hotel not found");
    }

    res.status(200).json({
      hotel,
    });
  } catch (error) {
    console.error("Error searching hotel:", error);
    return res.status(403).send("Internal server error");
  }
};

//watch reviews and rooms
export const createHotel = async (req, res) => {
  const { name, address, phone, email, rooms } = req.body;
  const allowed = req.user;
  /*if(allowed.role === "USER_ROLE"){
      return res.status(400).json({
          msg: "you cannot access this function",
        });
  }
  */
  try {
    const newHotel = new hotelModel({
      name,
      address,
      phone,
      email,
      //rooms: roomsId
    });
    await newHotel.save();
    res.status(200).json({
      msg: "hotel successfully added",
      newHotel,
    });
  } catch (e) {
    res.status(500).json({
      msg: "error  adding",
      error: e.message,
    });
  }
};

export const deletehotel = async (req, res) => {
  const { id } = req.params;
  const allowed = req.user;
/*
  if (allowed.role !== "ADMIN_ROLE") {
    return res.status(403).send("You cannot acces to this function");
  }
  */
  await hotelModel.findByIdAndUpdate(id, { status: false });
  const deletedhotelModel = await hotelModel.findById(id);
  res.status(200).json({
    msg: "hotelModel deleted successfully ",
    deletedhotelModel,
  });
};

export const showAllHotels = async (req, res) => {
  const allowed = req.user;
  if (allowed.role === "USER_ROLE") {
    return res.status(403).send("You cannot acces to this function");
  }
 
  const hotelss = await hotelModel.find({ status: true });
  res.status(200).json({
    hotelss,
  });
};

export const updateHotelName = async (req, res) => {
  const { name, address, phone, email } = req.body;
  const { id } = req.params;
  var idHotel;
  const allowed = req.user;
  var help;
  if (allowed.role !== "ADMIN_ROLE") {
    return res.status(403).send("You cannot acces to this function");
  }
  const old = await hotelModel.findById(id);
  if (!name) {
    name = old.name;
  } else {
    const oldTwo = await hotelModel.findOne({ name });
    if (oldTwo) {
      if (oldTwo.id !== id) {
        return res.status(400).send("The hotel already exists");
      }
    }
  }
  if (!address) {
    address = old.address;
  }
  if (!phone) {
    phone = old.phone;
  }
  if (!email) {
    email = old.email;
  }

  await hotelModel.findByIdAndUpdate(id, {
    name: name,
    address: address,
    phone: phone,
    email: email,
  });
  const updatedHotel = await hotelModel.findById(id);
  res.status(200).json({
    msg: "Hotel succesfully updated",
    updatedHotel,
  });
};
