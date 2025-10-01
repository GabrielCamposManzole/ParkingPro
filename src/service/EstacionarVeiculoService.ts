import Veiculo from "../model/Veiculo";
import { IRepositorioVagas } from "../Repository/insterfaces/IRepositorioVagas";
import { IRepositorioVeiculos } from "../Repository/insterfaces/RepositorioVeiculos";
import { IEstacionamentoService } from "../Repository/insterfaces/IEstacionamentoService";

/**
 * Implementa a lógica de negócio para estacionar e remover veículos.
 */
export default class EstacionarVeiculoService implements IEstacionamentoService {
    
    // Injeção de Dependência via construtor.
    constructor(
        private readonly repositorioVagas: IRepositorioVagas, 
        private readonly repositorioVeiculos: IRepositorioVeiculos
    ) {}

    public estacionar(veiculo: Veiculo): boolean {
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

    public remover(placa: string): boolean {
        const vagaOcupada = this.repositorioVagas.buscarVagaPorPlaca(placa);
        
        if (vagaOcupada) {
            vagaOcupada.desocupar(); 
            console.log(`Veículo ${placa} removido da vaga ${vagaOcupada.getNumero()}.`);
            return this.repositorioVeiculos.removerVeiculoPorPlaca(placa);
        }
        console.log(`Veículo com placa ${placa} não encontrado.`);
        return false;
    }
    
    public listarVeiculosEstacionados(): Veiculo[] {
        return this.repositorioVeiculos.listarVeiculosEstacionados();
    }

    public vagasDisponiveis(): number {
     return this.repositorioVagas.listarVagas().filter(vaga => !vaga.isOcupada()).length;
   }
}