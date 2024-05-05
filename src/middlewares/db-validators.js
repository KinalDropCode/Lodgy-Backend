import User from "../modules/user/user.model.js";

import hotelModel from "../modules/hotel/hotel.model.js";
import userModel from "../modules/user/user.model.js";
import eventModel from "../modules/event/event.model.js";
import recurseModel from "../modules/recurse/recurse.model.js";


export const recurseIdDoesntExist = async(id ="")=>{
  const recurses = await recurseModel.findById(id);
  if(!recurses){
    throw new Error(`The recurse doesnt exist`);
  }
}

export const eventIdDoesntExist = async(id = "")=>{
  const events = await eventModel.findById(id);
  if(!events){
    throw new Error(`The hotel does not exist`);
  }
}

export const hotelIdExist = async (id = "") => {
  const hotels = await hotelModel.findById(id);
  if (!hotels) {
    throw new Error(`The hotel does not exist`);
  }
};

export const hotelEmailExist = async (email = "") => {
  const hotels = await hotelModel.findOne({ email: email });
  if (hotels) {
    throw new Error(`The hotel email already exist`);
  }
};

export const hotelNameExist = async (name = "") => {
  const hotels = await hotelModel.findOne({ name: name });
  if (hotels) {
    throw new Error(`The hotel name already exist`);
  }
};

export const hotelNameDoesntExist = async (name = "") => {
  const hotels = await hotelModel.findOne({ name: name });
  if (!hotels) {
    throw new Error(`Hotel doesnt exist`);
  }
};

export const hotelPhoneRegistered = async (phone = "") => {
  const hotels = await hotelModel.findOne({ phone: phone });
  if (hotels) {
    throw new Error(`The hotel phone is already registered`);
  }
};

export const hotelAddressRegistered = async (address = "") => {
  const hotels = await hotelModel.findOne({ address: address });
  if (hotels) {
    throw new Error(`The hotel address is already registered`);
  }
};

export const userNameExist = async (name = "") => {
  const user = await userModel.findOne({ name: name });
  if (user) {
    throw new Error(`The user name already exist`);
  }
};

export const existentEmail = async (email = "") => {
  const existMail = await User.findOne({ email });
  if (existMail) {
    throw new Error(`The email ${email} is already registered in the database`);
  }
};

export const existentUserById = async (id = "") => {
  console.log("");
  console.log("--- [NOTES] existentUserById.db-validators");
  try {
    const existUser = await User.findOne({ id });
    if (existUser) {
      return {
        id: existUser._id,
        name: existUser.name,
        email: existUser.email,
        status: existUser.status,
      };
    } else {
      throw new Error(`The user with ${id} does not exist in the database.`);
    }
  } catch (error) {
    console.log(
      "Oops, there was an error while searching for the user in the database: ",
      error
    );
    //console.error('Oops, there was an error while searching for the user in the database: ', error);
    //throw error;
  }
};

export const existUserByEmail = async (email = "") => {
  console.log("");
  console.log("--- [NOTES] existUserByEmail.db-validators");
  try {
    const user = await User.findOne({ email });
    if (user) {
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
      };
    } else {
      console.log(
        `The user with the email ${email} does not exist in the database.`
      );
      //throw new Error(`The user with ${ email } does not exist in the database.` );
      return null;
    }
  } catch (error) {
    console.log(
      "Oops, there was an error while searching for the user in the database: ",
      error
    );
    //console.error('Oops, there was an error while searching for the user in the database: ', error);
    throw error;
  }
};
