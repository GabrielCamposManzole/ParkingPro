import { IVagaService } from "../Repository/insterfaces/IVagaService";
import { IRepositorioVagas } from "../Repository/insterfaces/IRepositorioVagas";
import { TipoVeiculo } from "../model/TipoVeiculo";
import Vaga from "../model/Vaga";

export default class VagaService implements IVagaService {

    constructor(private readonly repositorioVagas: IRepositorioVagas) {}

    getVagasTotais(): number {
        return this.repositorioVagas.listarVagas().length;
    }

    getVagasOcupadas(): number {
        return this.repositorioVagas.listarVagas().filter(vaga => vaga.isOcupada()).length;
    }

    getVagasPorTipo(tipo: TipoVeiculo): Vaga[] {
        return this.repositorioVagas.listarVagasPorTipo(tipo);
    }

    getVagasOcupadasPorTipo(tipo: TipoVeiculo): number {
        return this.repositorioVagas.listarVagasPorTipo(tipo).filter(vaga => vaga.isOcupada()).length;
    }

    addVaga(tipo: TipoVeiculo, numero: number): boolean {
        return this.repositorioVagas.addVaga(tipo, numero);
    }
}