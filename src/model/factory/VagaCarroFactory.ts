
import { VagaFactory } from "./VagaFactory";
import Vaga from "../Vaga";
import { TipoVeiculo } from "../TipoVeiculo";

export class VagaCarroFactory extends VagaFactory {
   // Esta fábrica sabe que deve criar uma Vaga do tipo CARRO
    public criarVaga(numero: number): Vaga {
        // Encapsula a lógica do "new" e do Enum
        return new Vaga(numero, TipoVeiculo.CARRO);
    }
}