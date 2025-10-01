import Cliente from "../../model/Cliente";
import Veiculo from "../../model/Veiculo";
import Carro from "../../model/Carro";
import Moto from "../../model/Moto";
import Caminhao from "../../model/Caminhao";

export interface IVeiculoService {
    criarCarro(placa: string, modelo: string, cor: string, cliente: Cliente): Carro;
    criarMoto(placa: string, modelo: string, cor: string, cliente: Cliente): Moto;
    criarCaminhao(placa: string, modelo: string, cor: string, cliente: Cliente): Caminhao;
    listarTodosCadastrados(): Veiculo[];
    buscarVeiculosPorCliente(cpf: string): Veiculo[];
}