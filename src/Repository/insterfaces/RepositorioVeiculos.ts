import Veiculo from "../../model/Veiculo";

export interface IRepositorioVeiculos {
    buscarVeiculoPorPlaca(placa: string): Veiculo | undefined;
    removerVeiculoPorPlaca(placa: string): boolean;
    salvarVeiculoEstacionado(veiculo: Veiculo): void;
    listarVeiculosEstacionados(): Veiculo[];
    salvarVeiculoCadastrado(veiculo: Veiculo): void;
    listarTodosCadastrados(): Veiculo[]; // NOVO

    buscarVeiculosPorCpfCliente(cpf: string): Veiculo[];
}