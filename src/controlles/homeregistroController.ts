import { Request, Response } from 'express';

import database from '../database';

class HomeRegistroController{

    public async list(req: Request, res: Response){
        const usuarios = await database.query('SELECT * FROM usuarios');
        res.json(usuarios);
    }

    public async getOne(req: Request, res: Response): Promise<any>{
        let { recordsets } = await database.query(`[smregistro].[spInfoEstudiante] ${req.params.id};`);

        if(recordsets .length > 0 ){
            console.log(recordsets)
            return res.json(recordsets[0]);
        }
        res.status(404).json({res: 'El usuario no existe'});
    }

    public async getAcademicRecords(req: Request, res: Response): Promise <any>{
        const { recordsets } = await database.query(`SELECT Asig.codAsignatura, Asig.nombreAsignatura, Asig.unidadesValorativas,
                                                        His.seccion, YEAR(Per.fechaInicio) Anio, Per.periodo, His.calificacion, His.observacion 
                                                        FROM Registro.smregistro.HistorialAcademico His
                                                        INNER JOIN Registro.smregistro.Asignatura Asig
                                                        ON His.codAsignatura = Asig.codAsignatura
                                                        INNER JOIN Registro.smregistro.Periodo Per
                                                        ON Per.codPeriodo = His.codPeriodo
                                                        WHERE His.cuentaEstudiante = ${req.params.id}
                                                            AND His.codCarrera = '${req.params.codecarrera}'`);
        return res.json(recordsets);                                                   
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

const homeregistroControlles = new HomeRegistroController();
export default homeregistroControlles;