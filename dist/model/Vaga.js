"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Vaga {
    numero;
    ocupada;
    tipoVaga;
    veiculoEstacionado;
    constructor(numero, tipoVaga) {
        this.numero = numero;
        this.ocupada = false;
        this.tipoVaga = tipoVaga;
        this.veiculoEstacionado = null;
    }
    getNumero() {
        return this.numero;
    }
    isOcupada() {
        return this.ocupada;
    }
    ocupar(veiculo) {
        this.ocupada = true;
        this.veiculoEstacionado = veiculo;
    }
    desocupar() {
        this.ocupada = false;
        this.veiculoEstacionado = null;
    }
    getTipoVaga() {
        return this.tipoVaga;
    }
    getVeiculoEstacionado() {
        return this.veiculoEstacionado;
    }
}
exports.default = Vaga;
