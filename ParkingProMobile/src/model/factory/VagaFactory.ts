
import Vaga from "../Vaga";
import { TipoVeiculo } from "../TipoVeiculo";

export abstract class VagaFactory {
  // Método abstrato (Factory Method):
    // As subclasses DEVEM decidir como implementar isso.
    public abstract criarVaga(numero: number): Vaga;

    public getTipoDaVaga(): TipoVeiculo {
        const vaga = this.criarVaga(0); 
        return vaga.getTipoVaga();
    }
}