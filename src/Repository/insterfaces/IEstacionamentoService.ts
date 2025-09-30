import Veiculo from "../../model/Veiculo";

export interface IEstacionamentoService {
    estacionar(veiculo: Veiculo): boolean;
    remover(placa: string): boolean;
    listarVeiculosEstacionados(): Veiculo[];
    vagasDisponiveis(): number;
}