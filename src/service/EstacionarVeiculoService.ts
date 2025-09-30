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

    public estacionar(veiculo: Veiculo): boolean {
        const vagaLivre = this.repositorioVagas.buscarVagaLivre(veiculo.getTipo());
        if (vagaLivre) {
            vagaLivre.ocupar(veiculo); 
            this.repositorioVeiculos.salvarVeiculoEstacionado(veiculo);
            return true;
        }
        return false;
    }

    public remover(placa: string): boolean {
        const vagaOcupada = this.repositorioVagas.buscarVagaPorPlaca(placa);
        
        if (vagaOcupada) {
            vagaOcupada.desocupar(); 
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