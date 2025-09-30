import { IEstacionamentoService } from "../Repository/insterfaces/IEstacionamentoService";
import { IRepositorioClientes } from "../Repository/insterfaces/IRepositorioClientes";
import { IRepositorioVagas } from "../Repository/insterfaces/IRepositorioVagas";
import { IRepositorioVeiculos } from "../Repository/insterfaces/RepositorioVeiculos";
import EstacionarVeiculoView from "../view/EstacionarVeiculoView";
import Cadastro from "../view/Cadastro";
import Cliente from "../model/Cliente";
import Carro from "../model/Carro";
import Moto from "../model/Moto";
import Caminhao from "../model/Caminhao";
import Veiculo from "../model/Veiculo";
import Vaga from "../model/Vaga";
import { ClientType } from "../model/ClientType";
import { TipoVeiculo } from "../model/TipoVeiculo";

export default class EstacionamentoController {

    private estacionarVeiculoService: IEstacionamentoService;
    private repositorioClientes: IRepositorioClientes;
    private repositorioVagas: IRepositorioVagas;
    private repositorioVeiculos: IRepositorioVeiculos;

    public estacionarVeiculoView: EstacionarVeiculoView;
    public cadastraCliente: Cadastro;

    constructor(
        estacionarVeiculoService: IEstacionamentoService,
        repositorioClientes: IRepositorioClientes,
        repositorioVagas: IRepositorioVagas,
        repositorioVeiculos: IRepositorioVeiculos
    ) {
        this.estacionarVeiculoService = estacionarVeiculoService;
        this.repositorioClientes = repositorioClientes;
        this.repositorioVagas = repositorioVagas;
        this.repositorioVeiculos = repositorioVeiculos;
        this.estacionarVeiculoView = new EstacionarVeiculoView(this);

        // AQUI ESTÁ A LINHA IMPORTANTE E CORRIGIDA
        this.cadastraCliente = new Cadastro(this); 
    }
    
    // --- Métodos de Clientes ---
    public criarCliente(nome: string, cpf: string, tipo: ClientType): Cliente {
        const novoCliente = new Cliente();
        novoCliente.setNome(nome);
        novoCliente.setCpf(cpf);
        novoCliente.setTipo(tipo);
        this.repositorioClientes.salvarCliente(novoCliente);
        return novoCliente;
    }

    public listarClientes(): Cliente[] {
        return this.repositorioClientes.listarClientes();
    }
    
    public buscarClientePorCpf(cpf: string): Cliente | undefined {
        return this.repositorioClientes.buscarPorCpf(cpf);
    }
 
    public atualizarCliente(cpf: string, novosDados: { nome: string; tipo: ClientType; }): Cliente | null {
        return this.repositorioClientes.atualizar(cpf, novosDados);
    }
    
    public excluirCliente(cpf: string): boolean {
        return this.repositorioClientes.excluir(cpf);
    }

    // --- Métodos de Veículos ---
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

    public estacionarVeiculo(placa: string, modelo: string, cor: string, tipo: TipoVeiculo): boolean {
        let veiculo: Veiculo;
        switch (tipo) {
            case TipoVeiculo.CARRO: veiculo = new Carro(placa, modelo, cor); break;
            case TipoVeiculo.MOTO: veiculo = new Moto(placa, modelo, cor); break;
            case TipoVeiculo.CAMINHAO: veiculo = new Caminhao(placa, modelo, cor); break;
            default: return false;
        }
        return this.estacionarVeiculoService.estacionar(veiculo);
    }

    public removerVeiculo(placa: string): boolean {
        return this.estacionarVeiculoService.remover(placa);
    }

    public buscarVeiculosPorCliente(cpf: string): Veiculo[] {
        return this.repositorioVeiculos.buscarVeiculosPorCpfCliente(cpf);
    }

    public listarTodosCadastrados(): Veiculo[] {
        return this.repositorioVeiculos.listarTodosCadastrados();
    }
    
    // --- Métodos para Dashboard e Vagas ---
    public getVagasOcupadas(): number {
      return this.repositorioVagas.listarVagas().filter(vaga => vaga.isOcupada()).length;
    }

    public getVagasTotais(): number {
      return this.repositorioVagas.listarVagas().length;
    }
    
    public getVagasDisponiveis(): number {
        return this.estacionarVeiculoService.vagasDisponiveis();
    }

    public getClientesCadastrados(): number {
      return this.repositorioClientes.listarClientes().length;
    }

    public getVagasPorTipo(tipo: TipoVeiculo): Vaga[] {
      return this.repositorioVagas.listarVagasPorTipo(tipo);
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
      return this.repositorioVagas.addVaga(tipo, numero);
    }
}