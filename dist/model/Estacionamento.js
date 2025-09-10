"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Estacionamento {
    capacidade;
    veiculosEstacionados;
    constructor(capacidade) {
        this.capacidade = capacidade;
        this.veiculosEstacionados = 0;
    }
    getCapacidade() {
        return this.capacidade;
    }
    setCapacidade(capacidade) {
        this.capacidade = capacidade;
    }
    getVeiculosEstacionados() {
        return this.veiculosEstacionados;
    }
}
exports.default = Estacionamento;
