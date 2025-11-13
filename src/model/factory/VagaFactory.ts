
import Vaga from "../Vaga";
import { TipoVeiculo } from "../TipoVeiculo";

export abstract class VagaFactory {
  
    public abstract criarVaga(numero: number): Vaga;

    public getTipoDaVaga(): TipoVeiculo {
        const vaga = this.criarVaga(0); 
        return vaga.getTipoVaga();
    }
}