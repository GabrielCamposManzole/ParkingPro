import Vaga from "../../model/Vaga";
import { TipoVeiculo } from "../../model/TipoVeiculo";

export interface IRepositorioVagas {
    buscarVagaLivre(tipo: TipoVeiculo): Vaga | undefined;
    listarVagasPorTipo(tipo: TipoVeiculo): Vaga[];
    addVaga(tipo: TipoVeiculo, numero: number): boolean;
    listarVagas(): Vaga[];
    buscarVagaPorPlaca(placa: string): Vaga | undefined; 
}