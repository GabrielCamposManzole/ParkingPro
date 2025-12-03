
import { VagaFactory } from "./VagaFactory";
import Vaga from "../Vaga";
import { TipoVeiculo } from "../TipoVeiculo";

export class VagaCaminhaoFactory extends VagaFactory {
    
    public criarVaga(numero: number): Vaga {
        return new Vaga(numero, TipoVeiculo.CAMINHAO);
    }
}