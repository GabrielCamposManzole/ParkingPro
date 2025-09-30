"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EstacionarVeiculoService {
    repositorioVagas;
    repositorioVeiculos;
    constructor(repositorioVagas, repositorioVeiculos) {
        this.repositorioVagas = repositorioVagas;
        this.repositorioVeiculos = repositorioVeiculos;
    }
    // ALTERADO: Agora passa o objeto veículo para o método ocupar
    estacionar(veiculo) {
        const vagaLivre = this.repositorioVagas.buscarVagaLivre(veiculo.getTipo());
        if (vagaLivre) {
            vagaLivre.ocupar(veiculo); // Vincula o veículo à vaga
            this.repositorioVeiculos.salvarVeiculoEstacionado(veiculo);
            return true;
        }
        return false;
    }
    // ALTERADO: Agora encontra a vaga e a desocupa
    remover(placa) {
        const vagaOcupada = this.repositorioVagas.buscarVagaPorPlaca(placa);
        if (vagaOcupada) {
            vagaOcupada.desocupar(); // Desvincula o veículo da vaga
            return this.repositorioVeiculos.removerVeiculoPorPlaca(placa);
        }
        return false;
    }
    listarVeiculosEstacionados() {
        return this.repositorioVeiculos.listarVeiculosEstacionados();
    }
    vagasDisponiveis() {
        return this.repositorioVagas.listarVagas().filter(vaga => !vaga.isOcupada()).length;
    }
}
exports.default = EstacionarVeiculoService;
