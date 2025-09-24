"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cliente_1 = __importDefault(require("./Cliente"));
class Veiculo {
    placa;
    modelo;
    horaEntrada;
    Cliente = new Cliente_1.default();
    constructor(placa, modelo) {
        this.placa = placa;
        this.modelo = modelo;
    }
    getPlaca() {
        return this.placa;
    }
    getModelo() {
        return this.modelo;
    }
    setHoraEntrada(hora) {
        this.horaEntrada = hora;
    }
    getHoraEntrada() {
        return this.horaEntrada;
    }
}
exports.default = Veiculo;
