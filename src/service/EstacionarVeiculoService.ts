import Veiculo from "../model/Veiculo";
import { IRepositorioVagas } from "../Repository/insterfaces/IRepositorioVagas";
import { IRepositorioVeiculos } from "../Repository/insterfaces/RepositorioVeiculos";
import { IEstacionamentoService } from "../Repository/insterfaces/IEstacionamentoService";

export default class EstacionarVeiculoService implements IEstacionamentoService {
    
    private repositorioVagas: IRepositorioVagas;
    private repositorioVeiculos: IRepositorioVeiculos;

    constructor(
        repositorioVagas: IRepositorioVagas, 
        repositorioVeiculos: IRepositorioVeiculos
    ) {
        this.repositorioVagas = repositorioVagas;
        this.repositorioVeiculos = repositorioVeiculos;
    }

    // ALTERADO: Agora passa o objeto veículo para o método ocupar
    public estacionar(veiculo: Veiculo): boolean {
        const vagaLivre = this.repositorioVagas.buscarVagaLivre(veiculo.getTipo());
        if (vagaLivre) {
            vagaLivre.ocupar(veiculo); // Vincula o veículo à vaga
            this.repositorioVeiculos.salvarVeiculoEstacionado(veiculo);
            return true;
        }
        return false;
    }

    // ALTERADO: Agora encontra a vaga e a desocupa
    public remover(placa: string): boolean {
        const vagaOcupada = this.repositorioVagas.buscarVagaPorPlaca(placa);
        
        if (vagaOcupada) {
            vagaOcupada.desocupar(); // Desvincula o veículo da vaga
            return this.repositorioVeiculos.removerVeiculoPorPlaca(placa);
        }
        return false;
    }
    
    public listarVeiculosEstacionados(): Veiculo[] {
        return this.repositorioVeiculos.listarVeiculosEstacionados();
    }

    public vagasDisponiveis(): number {
     return this.repositorioVagas.listarVagas().filter(vaga => !vaga.isOcupada()).length;
   }
}