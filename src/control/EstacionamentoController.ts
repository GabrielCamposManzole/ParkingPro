import Database from "../db/Database";
import EstacionarVeiculoService from "../service/EstacionarVeiculoService";
import EstacionarVeiculoView from "../view/EstacionarVeiculoView";
import Cadastro from "../view/Cadastro";
import TerminalView from "../view/TerminalView";
import Cliente from "../model/Cliente";
import Veiculo from "../model/Veiculo";
import { ClientType } from "../model/ClientType";
import { TipoVeiculo } from "../model/TipoVeiculo";
import Carro from "../model/Carro";
import Moto from "../model/Moto";
import Caminhao from "../model/Caminhao";
import Vaga from "../model/Vaga";

// Este Controller agora é o "Composition Root" da aplicação.
export default class EstacionamentoController {

    // O controller precisa de propriedades para armazenar as instâncias que ele cria.
    private readonly database: Database;
    private readonly estacionarVeiculoService: EstacionarVeiculoService;
    
    public readonly cadastraCliente: Cadastro;
    public readonly estacionarVeiculoView: EstacionarVeiculoView;

    // O construtor agora é responsável por criar TUDO e iniciar a aplicação.
    constructor() {
        // 1. Cria a dependência de dados
        this.database = new Database();

        // 2. Cria a dependência de serviço, passando o banco de dados
        this.estacionarVeiculoService = new EstacionarVeiculoService(this.database, this.database);

        // 3. Cria as views, passando a si mesmo ('this') para elas
        this.cadastraCliente = new Cadastro(this);
        this.estacionarVeiculoView = new EstacionarVeiculoView(this);
        const terminalView = new TerminalView(this);

        // 4. Inicia a aplicação
        console.log("Sistema de Estacionamento iniciado.");
        terminalView.exibirMenu();
        console.log("Sistema de Estacionamento Finalizado.");
    }
    
    // --- Métodos de Clientes ---
    public criarCliente(nome: string, cpf: string, tipo: ClientType): Cliente {
        const novoCliente = new Cliente();
        novoCliente.setNome(nome);
        novoCliente.setCpf(cpf);
        novoCliente.setTipo(tipo);
        this.database.salvarCliente(novoCliente);
        return novoCliente;
    }

    public listarClientes(): Cliente[] {
        return this.database.listarClientes();
    }
    
    public buscarClientePorCpf(cpf: string): Cliente | undefined {
        return this.database.buscarPorCpf(cpf);
    }
 
    public atualizarCliente(cpf: string, novosDados: { nome: string; tipo: ClientType; }): Cliente | null {
        return this.database.atualizar(cpf, novosDados);
    }
    
    public excluirCliente(cpf: string): boolean {
        return this.database.excluir(cpf);
    }

    // --- Métodos de Veículos ---
    public criarCarro(placa: string, modelo: string, cor: string, cliente: Cliente): Carro {
        const novoCarro = new Carro(placa, modelo, cor);
        novoCarro.setCliente(cliente);
        this.database.salvarVeiculoCadastrado(novoCarro);
        return novoCarro;
    }

    public criarMoto(placa: string, modelo: string, cor: string, cliente: Cliente): Moto {
        const novaMoto = new Moto(placa, modelo, cor);
        novaMoto.setCliente(cliente);
        this.database.salvarVeiculoCadastrado(novaMoto);
        return novaMoto;
    }

    public criarCaminhao(placa: string, modelo: string, cor: string, cliente: Cliente): Caminhao {
        const novoCaminhao = new Caminhao(placa, modelo, cor);
        novoCaminhao.setCliente(cliente);
        this.database.salvarVeiculoCadastrado(novoCaminhao);
        return novoCaminhao;
    }

    public estacionarVeiculo(dados: { placa: string, modelo: string, cor: string, tipo: TipoVeiculo, cliente?: Cliente }): boolean {
        let veiculo: Veiculo;
        switch (dados.tipo) {
            case TipoVeiculo.CARRO: veiculo = new Carro(dados.placa, dados.modelo, dados.cor); break;
            case TipoVeiculo.MOTO: veiculo = new Moto(dados.placa, dados.modelo, dados.cor); break;
            case TipoVeiculo.CAMINHAO: veiculo = new Caminhao(dados.placa, dados.modelo, dados.cor); break;
            default: return false;
        }

        if (dados.cliente) {
            veiculo.setCliente(dados.cliente);
        }
        
        return this.estacionarVeiculoService.estacionar(veiculo);
    }

    public removerVeiculo(placa: string): boolean {
        return this.estacionarVeiculoService.remover(placa);
    }

    public buscarVeiculosPorCliente(cpf: string): Veiculo[] {
        return this.database.buscarVeiculosPorCpfCliente(cpf);
    }

    public listarTodosCadastrados(): Veiculo[] {
        return this.database.listarTodosCadastrados();
    }
    
    // --- Métodos para Dashboard e Vagas ---
    public getVagasOcupadas(): number {
      return this.database.listarVagas().filter(vaga => vaga.isOcupada()).length;
    }

    public getVagasTotais(): number {
      return this.database.listarVagas().length;
    }
    
    public getVagasDisponiveis(): number {
        return this.estacionarVeiculoService.vagasDisponiveis();
    }

    public getClientesCadastrados(): number {
      return this.database.listarClientes().length;
    }

    public getVagasPorTipo(tipo: TipoVeiculo): Vaga[] {
      return this.database.listarVagasPorTipo(tipo);
    }

    public getVagasLivresPorTipo(tipo: TipoVeiculo): number {
        return this.getVagasPorTipo(tipo).filter(vaga => !vaga.isOcupada()).length;
    }

    public getVagasOcupadasPorTipo(tipo: TipoVeiculo): number {
        return this.getVagasPorTipo(tipo).filter(vaga => vaga.isOcupada()).length;
    }
    
    public listarVeiculosEstacionados(): Veiculo[] {
        return this.estacionarVeiculoService.listarVeiculosEstacionados();
    }
    
    // --- Métodos de Gestão ---
    public addVaga(tipo: TipoVeiculo, numero: number): boolean {
      return this.database.addVaga(tipo, numero);
    }
}