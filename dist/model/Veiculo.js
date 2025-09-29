"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Veiculo {
    placa;
    modelo;
    cor;
    horaEntrada;
    cliente;
    constructor(placa, modelo, cor) {
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
    setCliente(cliente) {
        this.cliente = cliente;
    }
    getCliente() {
        return this.cliente;
    }
}
exports.default = Veiculo;
