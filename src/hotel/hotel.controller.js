import hotelModel from "../modules/hotel/hotel.model.js";


export const createHotel = async (req, res) => {
  const { idUser } = req.params;
  try {
    const { name, address, phone, email, img, desc } = req.body;
    const hotel = await hotelModel.create({ name, address, phone, email, img, desc, administrator: idUser })
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).send(`Error al crear el hotel ${error}`);
  }
};

export const getHotels = async (req, res) => {
  try {
    const hotel = await hotelModel.find({ status: true });
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).send(`Error al listar los hoteles ${error}`);
  }
}

export const getHotelsByAdministrator = async (req, res) => {
  const { idUser } = req.params;
  try {
    const hotel = await hotelModel.find({ status: true, administrator: idUser });
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).send(`Error al listar los hoteles ${error}`);
  }
}

export const deleteHotel = async (req, res) => {
  const { idHotel } = req.params;
  try {
    const hotel = await hotelModel.findByIdAndUpdate(idHotel, { status: false }, { new: true });
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).send(`Error al eliminar los hoteles ${error}`);
  }
}

export const editHotel = async (req, res) => {
  const { idHotel } = req.params;
  try {
    const { name, address, phone, email, img, des } = req.body;

    const updateField = {};
    if (name) updateField.name = name
    if (address) updateField.address = address
    if (phone) updateField.phone = phone
    if (email) updateField.email = email
    if (img) updateField.img = img
    if (des) updateField.des = des
    a
    const hotel = await hotelModel.findByIdAndUpdate(idHotel, updateField, { new: true });

    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).send(`Error al editar los hoteles ${error}`);
  }
}


export const searchHotelsByName = async (req, res) => {
  try {
    const { name } = req.body;
    const regex = new RegExp(name, 'i'); // 'i' for case-insensitive
    const hotels = await hotelModel.find({ name: { $regex: regex }, status: true });
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).send(`Error al buscar los hoteles ${error}`);
  }
};