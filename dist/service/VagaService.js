"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VagaService {
    repositorioVagas;
    constructor(repositorioVagas) {
        this.repositorioVagas = repositorioVagas;
    }
    getVagasTotais() {
        return this.repositorioVagas.listarVagas().length;
    }
    getVagasOcupadas() {
        return this.repositorioVagas.listarVagas().filter(vaga => vaga.isOcupada()).length;
    }
    getVagasPorTipo(tipo) {
        return this.repositorioVagas.listarVagasPorTipo(tipo);
    }
    getVagasOcupadasPorTipo(tipo) {
        return this.repositorioVagas.listarVagasPorTipo(tipo).filter(vaga => vaga.isOcupada()).length;
    }
    addVaga(tipo, numero) {
        return this.repositorioVagas.addVaga(tipo, numero);
    }
    // Implementação da sobrecarga 
    buscarVaga(indentificador) {
        if (typeof indentificador === 'number') {
            console.log(`Buscando vaga pelo número: ${indentificador}`);
            return this.repositorioVagas.buscarVagaPorNumero(indentificador);
        }
        else {
            console.log(`Buscando vaga pela placa: ${indentificador}`);
            return this.repositorioVagas.buscarVagaPorPlaca(indentificador);
        }
    }
}
exports.default = VagaService;
