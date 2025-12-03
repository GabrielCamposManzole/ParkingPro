import { IVeiculoService } from "../Repository/insterfaces/IVeiculoService";
import { IRepositorioVeiculos } from "../Repository/insterfaces/IRepositorioVeiculos";
import { TipoVeiculo } from "../model/TipoVeiculo";
import Cliente from "../model/Cliente";
import Veiculo from "../model/Veiculo";
import Carro from "../model/Carro";
import Moto from "../model/Moto";
import Caminhao from "../model/Caminhao";

export default class VeiculoService implements IVeiculoService {

    constructor(private readonly repositorioVeiculos: IRepositorioVeiculos) {}

    public criarVeiculo(
        placa: string, modelo: string, cor: string, cliente: Cliente, 
        tipo: TipoVeiculo
    ): Carro | Moto | Caminhao {
        
        switch (tipo) {
            case TipoVeiculo.CARRO:
                return this.criarCarro(placa, modelo, cor, cliente);
            case TipoVeiculo.MOTO:
                return this.criarMoto(placa, modelo, cor, cliente);
            case TipoVeiculo.CAMINHAO:
                return this.criarCaminhao(placa, modelo, cor, cliente);
            default:
                throw new Error("Tipo de veículo inválido.");
        }
    }

    public criarCarro(placa: string, modelo: string, cor: string, cliente: Cliente): Carro {
        const novoCarro = new Carro(placa, modelo, cor);
        novoCarro.setCliente(cliente);
        this.repositorioVeiculos.salvarVeiculoCadastrado(novoCarro);
        return novoCarro;
    }

    public criarMoto(placa: string, modelo: string, cor: string, cliente: Cliente): Moto {
        const novaMoto = new Moto(placa, modelo, cor);
        novaMoto.setCliente(cliente);
        this.repositorioVeiculos.salvarVeiculoCadastrado(novaMoto);
        return novaMoto;
    }

    public criarCaminhao(placa: string, modelo: string, cor: string, cliente: Cliente): Caminhao {
        const novoCaminhao = new Caminhao(placa, modelo, cor);
        novoCaminhao.setCliente(cliente);
        this.repositorioVeiculos.salvarVeiculoCadastrado(novoCaminhao);
        return novoCaminhao;
    }

    public listarTodosCadastrados(): Veiculo[] {
        return this.repositorioVeiculos.listarTodosCadastrados();
    }

    public buscarVeiculosPorCliente(cpf: string): Veiculo[] {
        return this.repositorioVeiculos.buscarVeiculosPorCpfCliente(cpf);
    }
}