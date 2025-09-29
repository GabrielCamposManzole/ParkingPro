"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EstacionarVeiculoService_1 = __importDefault(require("../service/EstacionarVeiculoService"));
const EstacionarVeiculoView_1 = __importDefault(require("../view/EstacionarVeiculoView"));
const Cadastro_1 = __importDefault(require("../view/Cadastro"));
const TerminalView_1 = __importDefault(require("../view/TerminalView"));
const Cliente_1 = __importDefault(require("../model/Cliente"));
const Carro_1 = __importDefault(require("../model/Carro"));
const Moto_1 = __importDefault(require("../model/Moto"));
const Caminhao_1 = __importDefault(require("../model/Caminhao"));
const Database_1 = __importDefault(require("../db/Database"));
const TipoVeiculo_1 = require("../model/TipoVeiculo");
const Vaga_1 = __importDefault(require("../model/Vaga"));
class EstacionamentoController {
    database = new Database_1.default();
    estacionarVeiculoService;
    estacionarVeiculoView;
    cadastraCliente = new Cadastro_1.default(this);
    terminalView;
    constructor() {
        this.estacionarVeiculoService = new EstacionarVeiculoService_1.default();
        this.estacionarVeiculoView = new EstacionarVeiculoView_1.default(this);
        this.terminalView = new TerminalView_1.default(this);
    }
    // Método para criar e retornar uma nova instância de Cliente
    criarCliente(nome, cpf, tipo) {
        const novoCliente = new Cliente_1.default();
        novoCliente.setNome(nome);
        novoCliente.setCpf(cpf);
        novoCliente.setTipo(tipo);
        this.database.clienteDB.push(novoCliente);
        return novoCliente;
    }
    // Métodos para criar instâncias de veículos e armazená-los no banco de dados
    criarCarro(placa, modelo, cor, cliente) {
        const novoCarro = new Carro_1.default(placa, modelo, cor);
        novoCarro.setCliente(cliente);
        this.database.carrosDB.push(novoCarro);
        return novoCarro;
    }
    criarMoto(placa, modelo, cor, cliente) {
        const novaMoto = new Moto_1.default(placa, modelo, cor);
        novaMoto.setCliente(cliente);
        this.database.motosDB.push(novaMoto);
        return novaMoto;
    }
    criarCaminhao(placa, modelo, cor, cliente) {
        const novoCaminhao = new Caminhao_1.default(placa, modelo, cor);
        novoCaminhao.setCliente(cliente);
        this.database.caminhoesDB.push(novoCaminhao);
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
            default:
                return false;
        }
        return this.estacionarVeiculoService.estacionarVeiculo(veiculo);
    }
    removerVeiculo(placa) {
        return this.estacionarVeiculoService.removerVeiculo(placa);
    }
    listarClientes() {
        return this.database.clienteDB;
    }
    // Novos métodos para o Dashboard
    getVagasOcupadas() {
        const vagasOcupadasCarro = this.database.vagasCarro.filter(vaga => vaga.isOcupada()).length;
        const vagasOcupadasMoto = this.database.vagasMoto.filter(vaga => vaga.isOcupada()).length;
        const vagasOcupadasCaminhao = this.database.vagasCaminhao.filter(vaga => vaga.isOcupada()).length;
        return vagasOcupadasCarro + vagasOcupadasMoto + vagasOcupadasCaminhao;
    }
    getVagasTotais() {
        return this.database.vagasCarro.length + this.database.vagasMoto.length + this.database.vagasCaminhao.length;
    }
    getClientesCadastrados() {
        return this.database.clienteDB.length;
    }
    getVagasPorTipo(tipo) {
        switch (tipo) {
            case TipoVeiculo_1.TipoVeiculo.CARRO:
                return this.database.vagasCarro;
            case TipoVeiculo_1.TipoVeiculo.MOTO:
                return this.database.vagasMoto;
            case TipoVeiculo_1.TipoVeiculo.CAMINHAO:
                return this.database.vagasCaminhao;
            default:
                return [];
        }
    }
    getVagasLivresPorTipo(tipo) {
        const vagas = this.getVagasPorTipo(tipo);
        return vagas.filter(vaga => !vaga.isOcupada()).length;
    }
    getVagasOcupadasPorTipo(tipo) {
        const vagas = this.getVagasPorTipo(tipo);
        return vagas.filter(vaga => vaga.isOcupada()).length;
    }
    // Novos métodos para Gestão
    addVaga(tipo, numero) {
        const novaVaga = new Vaga_1.default(numero, tipo);
        switch (tipo) {
            case TipoVeiculo_1.TipoVeiculo.CARRO:
                this.database.vagasCarro.push(novaVaga);
                return true;
            case TipoVeiculo_1.TipoVeiculo.MOTO:
                this.database.vagasMoto.push(novaVaga);
                return true;
            case TipoVeiculo_1.TipoVeiculo.CAMINHAO:
                this.database.vagasCaminhao.push(novaVaga);
                return true;
            default:
                return false;
        }
    }
}
exports.default = EstacionamentoController;
