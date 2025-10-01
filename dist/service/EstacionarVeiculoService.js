"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Implementa a lógica de negócio para estacionar e remover veículos.
 */
class EstacionarVeiculoService {
    repositorioVagas;
    repositorioVeiculos;
    // Injeção de Dependência via construtor.
    constructor(repositorioVagas, repositorioVeiculos) {
        this.repositorioVagas = repositorioVagas;
        this.repositorioVeiculos = repositorioVeiculos;
    }
    estacionar(veiculo) {
        const vagaLivre = this.repositorioVagas.buscarVagaLivre(veiculo.getTipo());
        if (vagaLivre) {
            vagaLivre.ocupar(veiculo);
            this.repositorioVeiculos.salvarVeiculoEstacionado(veiculo);
            console.log(`Veículo ${veiculo.getPlaca()} estacionado na vaga ${vagaLivre.getNumero()}.`);
            return true;
        }
        console.log(`Não há vagas disponíveis para ${veiculo.getTipo()}.`);
        return false;
    }
    remover(placa) {
        const vagaOcupada = this.repositorioVagas.buscarVagaPorPlaca(placa);
        if (vagaOcupada) {
            vagaOcupada.desocupar();
            console.log(`Veículo ${placa} removido da vaga ${vagaOcupada.getNumero()}.`);
            return this.repositorioVeiculos.removerVeiculoPorPlaca(placa);
        }
        console.log(`Veículo com placa ${placa} não encontrado.`);
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
