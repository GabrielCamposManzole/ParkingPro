import { TipoVeiculo } from "../../model/TipoVeiculo";
import Vaga from "../../model/Vaga";

export interface IVagaService {
    getVagasTotais(): number;
    getVagasOcupadas(): number;
    getVagasPorTipo(tipo: TipoVeiculo): Vaga[];
    getVagasOcupadasPorTipo(tipo: TipoVeiculo): number;
    addVaga(tipo: TipoVeiculo, numero: number): boolean;

    // Assinatura A: bUSCAR POR ID (NÚMERO DA VAGA)
    buscarVaga(numero: number): Vaga | undefined;
    
    //Assnatura B: BUSCA POR PLACA (string)
    buscarVaga(placa: string): Vaga | undefined;
}