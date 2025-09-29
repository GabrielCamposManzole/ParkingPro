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
    getNumero() {
        return this.numero;
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
    getTipoVaga() {
        return this.tipoVaga;
    }
}
exports.default = Vaga;
