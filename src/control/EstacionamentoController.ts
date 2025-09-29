import EstacionarVeiculoService from "../service/EstacionarVeiculoService";
import EstacionarVeiculoView from "../view/EstacionarVeiculoView";
import Cadastro from "../view/Cadastro";
import TerminalView from "../view/TerminalView";
import Cliente from "../model/Cliente";
import Carro from "../model/Carro";
import Moto from "../model/Moto";
import Caminhao from "../model/Caminhao";
import Veiculo from "../model/Veiculo";
import { ClientType } from "../model/ClientType";
import Database from "../db/Database";
import { TipoVeiculo } from "../model/TipoVeiculo";
import Vaga from "../model/Vaga";

export default class EstacionamentoController {

    public database: Database = new Database();
    public estacionarVeiculoService: EstacionarVeiculoService;
    public estacionarVeiculoView: EstacionarVeiculoView;
    public cadastraCliente: Cadastro = new Cadastro(this);
    public terminalView: TerminalView;

    constructor() {
        this.estacionarVeiculoService = new EstacionarVeiculoService();
        this.estacionarVeiculoView = new EstacionarVeiculoView(this);
        this.terminalView = new TerminalView(this);
    }
    
    // Método para criar e retornar uma nova instância de Cliente
    public criarCliente(nome: string, cpf: string, tipo: ClientType): Cliente {
        const novoCliente = new Cliente();
        novoCliente.setNome(nome);
        novoCliente.setCpf(cpf);
        novoCliente.setTipo(tipo);
        this.database.clienteDB.push(novoCliente);
        return novoCliente;
    }

    // Métodos para criar instâncias de veículos e armazená-los no banco de dados
    public criarCarro(placa: string, modelo: string, cor: string, cliente: Cliente): Carro {
        const novoCarro = new Carro(placa, modelo, cor);
        novoCarro.setCliente(cliente);
        this.database.carrosDB.push(novoCarro);
        return novoCarro;
    }

    public criarMoto(placa: string, modelo: string, cor: string, cliente: Cliente): Moto {
        const novaMoto = new Moto(placa, modelo, cor);
        novaMoto.setCliente(cliente);
        this.database.motosDB.push(novaMoto);
        return novaMoto;
    }

    public criarCaminhao(placa: string, modelo: string, cor: string, cliente: Cliente): Caminhao {
        const novoCaminhao = new Caminhao(placa, modelo, cor);
        novoCaminhao.setCliente(cliente);
        this.database.caminhoesDB.push(novoCaminhao);
        return novoCaminhao;
    }

    public estacionarVeiculo(placa: string, modelo: string, cor: string, tipo: TipoVeiculo): boolean {
        let veiculo: Veiculo;
        switch (tipo) {
            case TipoVeiculo.CARRO:
                veiculo = new Carro(placa, modelo, cor);
                break;
            case TipoVeiculo.MOTO:
                veiculo = new Moto(placa, modelo, cor);
                break;
            case TipoVeiculo.CAMINHAO:
                veiculo = new Caminhao(placa, modelo, cor);
                break;
            default:
                return false;
        }
        return this.estacionarVeiculoService.estacionarVeiculo(veiculo);
    }

    public removerVeiculo(placa: string): boolean {
        return this.estacionarVeiculoService.removerVeiculo(placa);
    }
    
    public listarClientes(): Cliente[] {
        return this.database.clienteDB;
    }
    
    // Novos métodos para o Dashboard
    public getVagasOcupadas(): number {
      const vagasOcupadasCarro = this.database.vagasCarro.filter(vaga => vaga.isOcupada()).length;
      const vagasOcupadasMoto = this.database.vagasMoto.filter(vaga => vaga.isOcupada()).length;
      const vagasOcupadasCaminhao = this.database.vagasCaminhao.filter(vaga => vaga.isOcupada()).length;
      return vagasOcupadasCarro + vagasOcupadasMoto + vagasOcupadasCaminhao;
    }

    public getVagasTotais(): number {
      return this.database.vagasCarro.length + this.database.vagasMoto.length + this.database.vagasCaminhao.length;
    }

    public getClientesCadastrados(): number {
      return this.database.clienteDB.length;
    }

    public getVagasPorTipo(tipo: TipoVeiculo): Vaga[] {
      switch (tipo) {
        case TipoVeiculo.CARRO:
          return this.database.vagasCarro;
        case TipoVeiculo.MOTO:
          return this.database.vagasMoto;
        case TipoVeiculo.CAMINHAO:
          return this.database.vagasCaminhao;
        default:
          return [];
      }
    }

    public getVagasLivresPorTipo(tipo: TipoVeiculo): number {
        const vagas = this.getVagasPorTipo(tipo);
        return vagas.filter(vaga => !vaga.isOcupada()).length;
    }

    public getVagasOcupadasPorTipo(tipo: TipoVeiculo): number {
        const vagas = this.getVagasPorTipo(tipo);
        return vagas.filter(vaga => vaga.isOcupada()).length;
    }

    // Novos métodos para Gestão
    public addVaga(tipo: TipoVeiculo, numero: number): boolean {
      const novaVaga = new Vaga(numero, tipo);
      switch (tipo) {
        case TipoVeiculo.CARRO:
          this.database.vagasCarro.push(novaVaga);
          return true;
        case TipoVeiculo.MOTO:
          this.database.vagasMoto.push(novaVaga);
          return true;
        case TipoVeiculo.CAMINHAO:
          this.database.vagasCaminhao.push(novaVaga);
          return true;
        default:
          return false;
      }
    }
}
