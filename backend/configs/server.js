'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
// import routes from 'routes.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.converPath = '/lodgy/v1/';
        
        this.middlewares();
        this.routes();
    }

    routes() {
        // this.app.use(this.converPath, routes);
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors())
        this.app.use(helmet());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;

