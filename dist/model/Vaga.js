"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Vaga {
    numero;
    ocupada;
    tipoVaga;
    veiculoEstacionado; // NOVO: Armazena o veículo na vaga
    constructor(numero, tipoVaga) {
        this.numero = numero;
        this.ocupada = false;
        this.tipoVaga = tipoVaga;
        this.veiculoEstacionado = null; // NOVO: Inicia como nulo
    }
    getNumero() {
        return this.numero;
    }
    isOcupada() {
        return this.ocupada;
    }
    // ALTERADO: Agora recebe o veículo que está ocupando
    ocupar(veiculo) {
        this.ocupada = true;
        this.veiculoEstacionado = veiculo;
    }
    // ALTERADO: Limpa a referência ao veículo
    desocupar() {
        this.ocupada = false;
        this.veiculoEstacionado = null;
    }
    getTipoVaga() {
        return this.tipoVaga;
    }
    // NOVO: Permite ver qual veículo está na vaga
    getVeiculoEstacionado() {
        return this.veiculoEstacionado;
    }
}
exports.default = Vaga;
