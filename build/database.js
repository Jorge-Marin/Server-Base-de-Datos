"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const keys_1 = __importDefault(require("./keys"));
var mssql = require('mssql');
let connection = mssql.connect(keys_1.default.database, function (err, res) {
    if (err) {
        throw err;
    }
    else {
        console.log('Conectado Correctamente A la Base de datos de Sql Server');
    }
});
exports.default = connection;
