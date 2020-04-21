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
class StudentController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const students = yield database_1.default.query('SELECT * FROM Registro.smregistro.Estudiante');
            console.log(students);
            res.json(students);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { recordsets } = yield database_1.default.query(`SELECT numCuenta,clave FROM Registro.smregistro.Estudiante WHERE numCuenta = ${req.params.id}`);
            if (recordsets.length > 0) {
                console.log(recordsets[0]);
                return res.json(recordsets[0]);
            }
            return res.status(404).json({ res: 'El usuario no existe' });
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
const studentControlles = new StudentController();
exports.default = studentControlles;
