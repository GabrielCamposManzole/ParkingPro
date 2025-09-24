"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EstacionarVeiculoService {
<<<<<<< HEAD
=======
    veiculosEstacionados = [];
    limiteVagas;
    constructor(limiteVagas = 100) {
        this.limiteVagas = limiteVagas;
    }
    estacionarVeiculo(veiculo) {
        if (this.veiculosEstacionados.length < this.limiteVagas) {
            this.veiculosEstacionados.push(veiculo);
            return true;
        }
        else {
            return false;
        }
    }
    removerVeiculo(placa) {
        const index = this.veiculosEstacionados.findIndex(v => v.getPlaca() === placa);
        if (index !== -1) {
            this.veiculosEstacionados.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    }
    listarVeiculosEstacionados() {
        return this.veiculosEstacionados;
    }
    vagasDisponiveis() {
        return this.limiteVagas - this.veiculosEstacionados.length;
    }
    getLimiteVagas() {
        return this.limiteVagas;
    }
>>>>>>> dc3ff32f0ea09eabadb7c0181db1a0fc11ccf841
}
exports.default = EstacionarVeiculoService;
