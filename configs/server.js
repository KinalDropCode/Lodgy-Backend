"use strict";

import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "../src/auth/auth.routes.js";
import hotelRoutes from "../src/hotel/hotel.routes.js";
import reviewRoutes from "../src/reviews/reviews.routes.js"
import { dbConnection } from "./mongo.js";

// import routes from 'routes.js';

class Server {
  constructor() {
    this.notes();
    this.app = express();
    this.port = process.env.PORT;
    this.authPath = "/lodgy/v1/auth";
    this.hotelPath = "/lodgy/v1/hotel";
    this.reviewPath = "/lodgy/v1/review";
        
    this.middlewares();
    this.conectDB();
    this.routes();
  }

  async conectDB() {
    await dbConnection();
  }

  routes() {
    this.app.use(this.authPath, authRoutes);
    this.app.use(this.hotelPath, hotelRoutes);
    this.app.use(this.reviewPath, reviewRoutes);
        
    // this.app.use(this.converPath, routes);
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port ", this.port);
    });
  }

  notes() {
    console.log("");
    console.log("");
    console.log("NOTE: Server constructor called!");
    console.log("if port 3000 is in use:");
    console.log("netstat -ano | findstr :3000");
    console.log("taskkill /PID <PID> /F");
    console.log("");
  }
}

export default Server;
