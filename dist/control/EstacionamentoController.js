"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TipoVeiculo_1 = require("../model/TipoVeiculo");
const Carro_1 = __importDefault(require("../model/Carro"));
const Moto_1 = __importDefault(require("../model/Moto"));
const Caminhao_1 = __importDefault(require("../model/Caminhao"));
class EstacionamentoController {
    estacionamentoService;
    clienteService;
    veiculoService;
    vagaService;
    constructor(estacionamentoService, clienteService, veiculoService, vagaService) {
        this.estacionamentoService = estacionamentoService;
        this.clienteService = clienteService;
        this.veiculoService = veiculoService;
        this.vagaService = vagaService;
    }
    // --- Métodos de Clientes ---
    criarCliente(nome, cpf, tipo) {
        return this.clienteService.criarCliente(nome, cpf, tipo);
    }
    listarClientes() {
        return this.clienteService.listarClientes();
    }
    buscarClientePorCpf(cpf) {
        return this.clienteService.buscarClientePorCpf(cpf);
    }
    atualizarCliente(cpf, novosDados) {
        return this.clienteService.atualizarCliente(cpf, novosDados);
    }
    excluirCliente(cpf) {
        return this.clienteService.excluirCliente(cpf);
    }
    getClientesCadastrados() {
        return this.clienteService.listarClientes().length;
    }
    // --- Métodos de Veículos ---
    criarCarro(placa, modelo, cor, cliente) {
        return this.veiculoService.criarCarro(placa, modelo, cor, cliente);
    }
    criarMoto(placa, modelo, cor, cliente) {
        return this.veiculoService.criarMoto(placa, modelo, cor, cliente);
    }
    criarCaminhao(placa, modelo, cor, cliente) {
        return this.veiculoService.criarCaminhao(placa, modelo, cor, cliente);
    }
    listarTodosCadastrados() {
        return this.veiculoService.listarTodosCadastrados();
    }
    buscarVeiculosPorCliente(cpf) {
        return this.veiculoService.buscarVeiculosPorCliente(cpf);
    }
    // --- Métodos de Estacionamento  ---
    estacionarVeiculo(dados) {
        let veiculo;
        switch (dados.tipo) {
            case TipoVeiculo_1.TipoVeiculo.CARRO:
                veiculo = new Carro_1.default(dados.placa, dados.modelo, dados.cor);
                break;
            case TipoVeiculo_1.TipoVeiculo.MOTO:
                veiculo = new Moto_1.default(dados.placa, dados.modelo, dados.cor);
                break;
            case TipoVeiculo_1.TipoVeiculo.CAMINHAO:
                veiculo = new Caminhao_1.default(dados.placa, dados.modelo, dados.cor);
                break;
            default: return false;
        }
        if (dados.cliente) {
            veiculo.setCliente(dados.cliente);
        }
        return this.estacionamentoService.estacionar(veiculo);
    }
    removerVeiculo(placa) {
        return this.estacionamentoService.remover(placa);
    }
    listarVeiculosEstacionados() {
        return this.estacionamentoService.listarVeiculosEstacionados();
    }
    getVagasDisponiveis() {
        return this.estacionamentoService.vagasDisponiveis();
    }
    // --- Métodos de Vagas  ---
    getVagasTotais() {
        return this.vagaService.getVagasTotais();
    }
    getVagasOcupadas() {
        return this.vagaService.getVagasOcupadas();
    }
    getVagasPorTipo(tipo) {
        return this.vagaService.getVagasPorTipo(tipo);
    }
    getVagasOcupadasPorTipo(tipo) {
        return this.vagaService.getVagasOcupadasPorTipo(tipo);
    }
    addVaga(tipo, numero) {
        return this.vagaService.addVaga(tipo, numero);
    }
    buscarVagaInteligente(indentificador) {
        if (typeof indentificador === 'string') {
            return this.vagaService.buscarVaga(indentificador);
        }
        else {
            return this.vagaService.buscarVaga(indentificador);
        }
    }
}
exports.default = EstacionamentoController;
