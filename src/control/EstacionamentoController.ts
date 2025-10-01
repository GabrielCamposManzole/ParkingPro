import { IEstacionamentoService } from "../Repository/insterfaces/IEstacionamentoService";
import { IClienteService } from "../Repository/insterfaces/IClienteService";
import { IVeiculoService } from "../Repository/insterfaces/IVeiculoService";
import { IVagaService } from "../Repository/insterfaces/IVagaService";
import { ClientType } from "../model/ClientType";
import { TipoVeiculo } from "../model/TipoVeiculo";
import Cliente from "../model/Cliente";
import Veiculo from "../model/Veiculo";
import Carro from "../model/Carro";
import Moto from "../model/Moto";
import Caminhao from "../model/Caminhao";
import Vaga from "../model/Vaga";

export default class EstacionamentoController {
    
    constructor(
        private readonly estacionamentoService: IEstacionamentoService,
        private readonly clienteService: IClienteService,
        private readonly veiculoService: IVeiculoService,
        private readonly vagaService: IVagaService
    ) {}
    
    // --- Métodos de Clientes (delegam para ClienteService) ---
    public criarCliente(nome: string, cpf: string, tipo: ClientType): Cliente {
        return this.clienteService.criarCliente(nome, cpf, tipo);
    }
    public listarClientes(): Cliente[] {
        return this.clienteService.listarClientes();
    }
    public buscarClientePorCpf(cpf: string): Cliente | undefined {
        return this.clienteService.buscarClientePorCpf(cpf);
    }
    public atualizarCliente(cpf: string, novosDados: { nome: string; tipo: ClientType; }): Cliente | null {
        return this.clienteService.atualizarCliente(cpf, novosDados);
    }
    public excluirCliente(cpf: string): boolean {
        return this.clienteService.excluirCliente(cpf);
    }
    public getClientesCadastrados(): number {
        return this.clienteService.listarClientes().length;
    }

    // --- Métodos de Veículos (delegam para VeiculoService) ---
    public criarCarro(placa: string, modelo: string, cor: string, cliente: Cliente): Carro {
        return this.veiculoService.criarCarro(placa, modelo, cor, cliente);
    }
    public criarMoto(placa: string, modelo: string, cor: string, cliente: Cliente): Moto {
        return this.veiculoService.criarMoto(placa, modelo, cor, cliente);
    }
    public criarCaminhao(placa: string, modelo: string, cor: string, cliente: Cliente): Caminhao {
        return this.veiculoService.criarCaminhao(placa, modelo, cor, cliente);
    }
    public listarTodosCadastrados(): Veiculo[] {
        return this.veiculoService.listarTodosCadastrados();
    }
    public buscarVeiculosPorCliente(cpf: string): Veiculo[] {
        return this.veiculoService.buscarVeiculosPorCliente(cpf);
    }

    // --- Métodos de Estacionamento (delegam para EstacionamentoService) ---
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
        return this.estacionamentoService.estacionar(veiculo);
    }
    public removerVeiculo(placa: string): boolean {
        return this.estacionamentoService.remover(placa);
    }
    public listarVeiculosEstacionados(): Veiculo[] {
        return this.estacionamentoService.listarVeiculosEstacionados();
    }
    public getVagasDisponiveis(): number {
        return this.estacionamentoService.vagasDisponiveis();
    }

    // --- Métodos de Vagas (delegam para VagaService) ---
    public getVagasTotais(): number {
        return this.vagaService.getVagasTotais();
    }
    public getVagasOcupadas(): number {
        return this.vagaService.getVagasOcupadas();
    }
    public getVagasPorTipo(tipo: TipoVeiculo): Vaga[] {
        return this.vagaService.getVagasPorTipo(tipo);
    }
    public getVagasOcupadasPorTipo(tipo: TipoVeiculo): number {
        return this.vagaService.getVagasOcupadasPorTipo(tipo);
    }
    public addVaga(tipo: TipoVeiculo, numero: number): boolean {
        return this.vagaService.addVaga(tipo, numero);
    }
}