"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EstacionarVeiculoView_1 = __importDefault(require("../view/EstacionarVeiculoView"));
const Cadastro_1 = __importDefault(require("../view/Cadastro"));
const Cliente_1 = __importDefault(require("../model/Cliente"));
const Carro_1 = __importDefault(require("../model/Carro"));
const Moto_1 = __importDefault(require("../model/Moto"));
const Caminhao_1 = __importDefault(require("../model/Caminhao"));
const TipoVeiculo_1 = require("../model/TipoVeiculo");
class EstacionamentoController {
    estacionarVeiculoService;
    repositorioClientes;
    repositorioVagas;
    repositorioVeiculos;
    estacionarVeiculoView;
    cadastraCliente;
    constructor(estacionarVeiculoService, repositorioClientes, repositorioVagas, repositorioVeiculos) {
        this.estacionarVeiculoService = estacionarVeiculoService;
        this.repositorioClientes = repositorioClientes;
        this.repositorioVagas = repositorioVagas;
        this.repositorioVeiculos = repositorioVeiculos;
        this.estacionarVeiculoView = new EstacionarVeiculoView_1.default(this);
        // AQUI ESTÁ A LINHA IMPORTANTE E CORRIGIDA
        this.cadastraCliente = new Cadastro_1.default(this);
    }
    // --- Métodos de Clientes ---
    criarCliente(nome, cpf, tipo) {
        const novoCliente = new Cliente_1.default();
        novoCliente.setNome(nome);
        novoCliente.setCpf(cpf);
        novoCliente.setTipo(tipo);
        this.repositorioClientes.salvarCliente(novoCliente);
        return novoCliente;
    }
    listarClientes() {
        return this.repositorioClientes.listarClientes();
    }
    buscarClientePorCpf(cpf) {
        return this.repositorioClientes.buscarPorCpf(cpf);
    }
    atualizarCliente(cpf, novosDados) {
        return this.repositorioClientes.atualizar(cpf, novosDados);
    }
    excluirCliente(cpf) {
        return this.repositorioClientes.excluir(cpf);
    }
    // --- Métodos de Veículos ---
    criarCarro(placa, modelo, cor, cliente) {
        const novoCarro = new Carro_1.default(placa, modelo, cor);
        novoCarro.setCliente(cliente);
        this.repositorioVeiculos.salvarVeiculoCadastrado(novoCarro);
        return novoCarro;
    }
    criarMoto(placa, modelo, cor, cliente) {
        const novaMoto = new Moto_1.default(placa, modelo, cor);
        novaMoto.setCliente(cliente);
        this.repositorioVeiculos.salvarVeiculoCadastrado(novaMoto);
        return novaMoto;
    }
    criarCaminhao(placa, modelo, cor, cliente) {
        const novoCaminhao = new Caminhao_1.default(placa, modelo, cor);
        novoCaminhao.setCliente(cliente);
        this.repositorioVeiculos.salvarVeiculoCadastrado(novoCaminhao);
        return novoCaminhao;
    }
    estacionarVeiculo(placa, modelo, cor, tipo) {
        let veiculo;
        switch (tipo) {
            case TipoVeiculo_1.TipoVeiculo.CARRO:
                veiculo = new Carro_1.default(placa, modelo, cor);
                break;
            case TipoVeiculo_1.TipoVeiculo.MOTO:
                veiculo = new Moto_1.default(placa, modelo, cor);
                break;
            case TipoVeiculo_1.TipoVeiculo.CAMINHAO:
                veiculo = new Caminhao_1.default(placa, modelo, cor);
                break;
            default: return false;
        }
        return this.estacionarVeiculoService.estacionar(veiculo);
    }
    removerVeiculo(placa) {
        return this.estacionarVeiculoService.remover(placa);
    }
    buscarVeiculosPorCliente(cpf) {
        return this.repositorioVeiculos.buscarVeiculosPorCpfCliente(cpf);
    }
    listarTodosCadastrados() {
        return this.repositorioVeiculos.listarTodosCadastrados();
    }
    // --- Métodos para Dashboard e Vagas ---
    getVagasOcupadas() {
        return this.repositorioVagas.listarVagas().filter(vaga => vaga.isOcupada()).length;
    }
    getVagasTotais() {
        return this.repositorioVagas.listarVagas().length;
    }
    getVagasDisponiveis() {
        return this.estacionarVeiculoService.vagasDisponiveis();
    }
    getClientesCadastrados() {
        return this.repositorioClientes.listarClientes().length;
    }
    getVagasPorTipo(tipo) {
        return this.repositorioVagas.listarVagasPorTipo(tipo);
    }
    getVagasLivresPorTipo(tipo) {
        return this.getVagasPorTipo(tipo).filter(vaga => !vaga.isOcupada()).length;
    }
    getVagasOcupadasPorTipo(tipo) {
        return this.getVagasPorTipo(tipo).filter(vaga => vaga.isOcupada()).length;
    }
    listarVeiculosEstacionados() {
        return this.estacionarVeiculoService.listarVeiculosEstacionados();
    }
    // --- Métodos de Gestão ---
    addVaga(tipo, numero) {
        return this.repositorioVagas.addVaga(tipo, numero);
    }
}
exports.default = EstacionamentoController;
