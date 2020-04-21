import { Request, Response } from 'express';

import database from '../database';

class StudentController{

    public async list(req: Request, res: Response){
        const students = await database.query('SELECT * FROM Registro.smregistro.Estudiante');
        console.log(students);
        res.json(students);
    }

    public async getOne(req: Request, res: Response): Promise<any>{
        let { recordsets } = await database.query(`SELECT numCuenta,clave FROM Registro.smregistro.Estudiante WHERE numCuenta = ${req.params.id}`);
        
        if(recordsets .length > 0 ){
            console.log(recordsets[0])
            return res.json(recordsets[0]);
        }
        return res.status(404).json({res: 'El usuario no existe'});
    }

    public async create(req: Request, res: Response){
        let data = req.body;
        let values: string = `${data.nombre}`;
       
        await database.query(`INSERT INTO usuarios (nombre) VALUES('${values}')`); 
        res.json({'text':'Se ha creando un nuevo usuario'})
    }

    public update(req: Request, res: Response){
        res.json({'text':'Se esta actualizando un usuario usuario '+ req.params.id})
    }

    public async delete(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await database.query(`DELETE usuarios WHERE codUsuario = ${id}`);
        res.json({'text':'Usuario Eliminado'});
    }
}

const studentControlles = new StudentController();
export default studentControlles;