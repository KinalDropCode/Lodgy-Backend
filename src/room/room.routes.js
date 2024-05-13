import express from 'express'
import { roomPost, deleteRoomId, getRoomById, roomUpdate } from './room.controller.js'
import { validateJWT } from '../middlewares/validate-jwt.js';

const api = express.Router(); 
api.post('/create', validateJWT, roomPost)


export default api