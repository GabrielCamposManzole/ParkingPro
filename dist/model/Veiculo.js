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
<<<<<<< HEAD
    Cliente = new Cliente_1.default();
    constructor(placa, modelo) {
=======
    cor;
    constructor(placa, modelo, cor) {
>>>>>>> dc3ff32f0ea09eabadb7c0181db1a0fc11ccf841
        this.placa = placa;
        this.modelo = modelo;
        this.cor = cor;
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
    getCor() {
        return this.cor;
    }
}
exports.default = Veiculo;
