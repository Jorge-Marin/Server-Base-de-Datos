"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class HomeRegistroController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield database_1.default.query('SELECT * FROM usuarios');
            res.json(usuarios);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { recordsets } = yield database_1.default.query(`[smregistro].[spInfoEstudiante] ${req.params.id};`);
            if (recordsets.length > 0) {
                console.log(recordsets);
                return res.json(recordsets[0]);
            }
            res.status(404).json({ res: 'El usuario no existe' });
        });
    }
    getAcademicRecords(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { recordsets } = yield database_1.default.query(`SELECT Asig.codAsignatura, Asig.nombreAsignatura, Asig.unidadesValorativas,
                                                        His.seccion, YEAR(Per.fechaInicio) Anio, Per.periodo, His.calificacion, His.observacion 
                                                        FROM Registro.smregistro.HistorialAcademico His
                                                        INNER JOIN Registro.smregistro.Asignatura Asig
                                                        ON His.codAsignatura = Asig.codAsignatura
                                                        INNER JOIN Registro.smregistro.Periodo Per
                                                        ON Per.codPeriodo = His.codPeriodo
                                                        WHERE His.cuentaEstudiante = ${req.params.id}
                                                            AND His.codCarrera = '${req.params.codecarrera}'`);
            return res.json(recordsets);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = req.body;
            let values = `${data.nombre}`;
            yield database_1.default.query(`INSERT INTO usuarios (nombre) VALUES('${values}')`);
            res.json({ 'text': 'Se ha creando un nuevo usuario' });
        });
    }
    update(req, res) {
        res.json({ 'text': 'Se esta actualizando un usuario usuario ' + req.params.id });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query(`DELETE usuarios WHERE codUsuario = ${id}`);
            res.json({ 'text': 'Usuario Eliminado' });
        });
    }
}
const homeregistroControlles = new HomeRegistroController();
exports.default = homeregistroControlles;
