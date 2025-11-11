import { IVeiculoService } from "../Repository/insterfaces/IVeiculoService";
import { IRepositorioVeiculos } from "../Repository/insterfaces/IRepositorioVeiculos";
import Cliente from "../model/Cliente";
import Veiculo from "../model/Veiculo";
import Carro from "../model/Carro";
import Moto from "../model/Moto";
import Caminhao from "../model/Caminhao";

export default class VeiculoService implements IVeiculoService {

    constructor(private readonly repositorioVeiculos: IRepositorioVeiculos) {}

    criarCarro(placa: string, modelo: string, cor: string, cliente: Cliente): Carro {
        const novoCarro = new Carro(placa, modelo, cor);
        novoCarro.setCliente(cliente);
        this.repositorioVeiculos.salvarVeiculoCadastrado(novoCarro);
        return novoCarro;
    }

    criarMoto(placa: string, modelo: string, cor: string, cliente: Cliente): Moto {
        const novaMoto = new Moto(placa, modelo, cor);
        novaMoto.setCliente(cliente);
        this.repositorioVeiculos.salvarVeiculoCadastrado(novaMoto);
        return novaMoto;
    }

    criarCaminhao(placa: string, modelo: string, cor: string, cliente: Cliente): Caminhao {
        const novoCaminhao = new Caminhao(placa, modelo, cor);
        novoCaminhao.setCliente(cliente);
        this.repositorioVeiculos.salvarVeiculoCadastrado(novoCaminhao);
        return novoCaminhao;
    }

    listarTodosCadastrados(): Veiculo[] {
        return this.repositorioVeiculos.listarTodosCadastrados();
    }

    buscarVeiculosPorCliente(cpf: string): Veiculo[] {
        return this.repositorioVeiculos.buscarVeiculosPorCpfCliente(cpf);
    }
}