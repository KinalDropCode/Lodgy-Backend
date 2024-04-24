const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const databaseSchema = {
  collections: {
    user: {
      _id: ObjectId,
      name: String,
      email: String,
      password: String,
      reservations: [{ type: ObjectId, ref: 'Reservation' }],
      history: [{ type: ObjectId, ref: 'Reservation' }]
    },
    admin: {
      _id: ObjectId,
      name: String,
      email: String,
      password: String
    },
    owner: {
      _id: ObjectId,
      name: String,
      email: String,
      password: String,
      hotel: { type: ObjectId, ref: 'Hotel' }
    },
    hotel: {
      _id: ObjectId,
      name: String,
      location: String,
      administrator: { type: ObjectId, ref: 'Owner' }
    },
    room: {
      _id: ObjectId,
      type: String,
      price: Number,
      availability: Boolean,
      hotel: { type: ObjectId, ref: 'Hotel' }
    },
    reservations: {
      _id: ObjectId,
      user: { type: ObjectId, ref: 'User' },
      room: { type: ObjectId, ref: 'Room' },
      startDate: Date,
      endDate: Date,
      total: Number,
      status: String
    },
    events: {
      _id: ObjectId,
      name: String,
      date: Date,
      location: String,
      details: String,
      extras: [String],
      extraCost: Number
    }
  }
};

const models = {};

for (const collectionName in databaseSchema.collections) {
  const collectionSchema = databaseSchema.collections[collectionName];
  const modelSchema = {};

  for (const field in collectionSchema) {
    if (field !== '_id') {
      modelSchema[field] = collectionSchema[field];
    }
  }

  models[collectionName] = mongoose.model(collectionName, new Schema(modelSchema));
}

module.exports = models;


/*
------ HOW IMPORT ONE COLLECTION????

// To import the models object in your code, you need to require the db.model.js file:

👁️ const models = require('./db.model.js');

// Now you can access the models object and use it to access the collections you need. 
// For example, to access the user collection, you can do the following:

👁️ const User = models.user;

// This will give you access to the User model, 
// which you can use to interact with the user collection in the database.

*/ 