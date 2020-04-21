"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const homeregistroController_1 = __importDefault(require("../controlles/homeregistroController"));
class HomeRegistroRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', homeregistroController_1.default.list);
        this.router.get('/:id', homeregistroController_1.default.getOne);
        this.router.get('/id/:id/codecarrera/:codecarrera', homeregistroController_1.default.getAcademicRecords);
        this.router.post('/', homeregistroController_1.default.create);
        this.router.put('/:id', homeregistroController_1.default.update);
        this.router.delete('/:id', homeregistroController_1.default.delete);
    }
}
const homregistroRoutes = new HomeRegistroRoutes();
exports.default = homregistroRoutes.router;
