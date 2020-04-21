import keys from './keys';
import { Response, ErrorRequestHandler } from 'express'

var mssql = require('mssql');

let connection = mssql.connect(keys.database, function(err: ErrorRequestHandler,res:Response){
    if(err){
        throw err;
    }else{
        console.log('Conectado Correctamente A la Base de datos de Sql Server');
    }
});

export default connection;

