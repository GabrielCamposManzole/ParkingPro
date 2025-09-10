"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Vaga {
    numero;
    ocupada;
    tipoVaga;
    constructor(numero, tipoVaga) {
        this.numero = numero;
        this.ocupada = false;
        this.tipoVaga = tipoVaga;
    }
    isOcupada() {
        return this.ocupada;
    }
    ocupar() {
        this.ocupada = true;
    }
    desocupar() {
        this.ocupada = false;
    }
    getNumero() {
        return this.numero;
    }
    getTipoVaga() {
        return this.tipoVaga;
    }
}
exports.default = Vaga;
