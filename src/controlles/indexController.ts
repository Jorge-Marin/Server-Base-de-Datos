import { Request, Response } from 'express';

import database from '../database';

class IndexController{

    public async index(req: Request, res: Response){
        let usuario = await database.query('SELECT * FROM usuarios');
        res.json(usuario);
    }

}

const indexControlles = new IndexController();
export default indexControlles;