import Cliente from "../../model/Cliente";
import Veiculo from "../../model/Veiculo";
import Carro from "../../model/Carro";
import Moto from "../../model/Moto";
import Caminhao from "../../model/Caminhao";
import { TipoVeiculo } from "../../model/TipoVeiculo";


export interface IVeiculoService {
    
    
    criarVeiculo(placa: string, modelo: string, cor: string, cliente: Cliente, tipo: TipoVeiculo.CARRO): Carro;
    criarVeiculo(placa: string, modelo: string, cor: string, cliente: Cliente, tipo: TipoVeiculo.MOTO): Moto;
    criarVeiculo(placa: string, modelo: string, cor: string, cliente: Cliente, tipo: TipoVeiculo.CAMINHAO): Caminhao;

    criarCarro(placa: string, modelo: string, cor: string, cliente: Cliente): Carro;
    criarMoto(placa: string, modelo: string, cor: string, cliente: Cliente): Moto;
    criarCaminhao(placa: string, modelo: string, cor: string, cliente: Cliente): Caminhao;

    listarTodosCadastrados(): Veiculo[];
    buscarVeiculosPorCliente(cpf: string): Veiculo[];
}