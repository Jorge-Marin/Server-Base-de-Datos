import express, { Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';

import IndexRoutes from './routes/indexRoutes'
import homeregistro from './routes/homeregistroRoutes';
import studentRoutes from './routes/studentRoutes';

class Server {

    public app: Application;
    
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void{
        this.app.set('port', process.env.Port || 5000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded());
    }

    routes(): void{
        this.app.use(IndexRoutes);
        this.app.use('/api/homeregistro',homeregistro);
        this.app.use('/api/student', studentRoutes);
    }

    start(): void{
        this.app.listen(this.app.get('port'),()=>{
            console.log("Server on port", this.app.get('port'))
        });
    }
}

const server = new Server();
server.start();