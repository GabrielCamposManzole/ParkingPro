"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EstacionarVeiculoService {
    repositorioVagas;
    repositorioVeiculos;
    constructor(repositorioVagas, repositorioVeiculos) {
        this.repositorioVagas = repositorioVagas;
        this.repositorioVeiculos = repositorioVeiculos;
    }
    estacionar(veiculo) {
        const vagaLivre = this.repositorioVagas.buscarVagaLivre(veiculo.getTipo());
        if (vagaLivre) {
            vagaLivre.ocupar(veiculo);
            this.repositorioVeiculos.salvarVeiculoEstacionado(veiculo);
            return true;
        }
        return false;
    }
    remover(placa) {
        const vagaOcupada = this.repositorioVagas.buscarVagaPorPlaca(placa);
        if (vagaOcupada) {
            vagaOcupada.desocupar();
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
