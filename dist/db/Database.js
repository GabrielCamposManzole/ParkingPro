"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Carro_1 = __importDefault(require("../model/Carro"));
const Caminhao_1 = __importDefault(require("../model/Caminhao"));
const Moto_1 = __importDefault(require("../model/Moto"));
const TipoVeiculo_1 = require("../model/TipoVeiculo");
const VagaCarroFactory_1 = require("../model/factory/VagaCarroFactory");
const VagaMotoFactory_1 = require("../model/factory/VagaMotoFactory");
const VagaCaminhaoFactory_1 = require("../model/factory/VagaCaminhaoFactory");
class Database {
    carrosDB = [];
    motosDB = [];
    caminhoesDB = [];
    clienteDB = [];
    vagasCarro = [];
    vagasMoto = [];
    vagasCaminhao = [];
    veiculosEstacionados = [];
    constructor() {
        const factoryCarro = new VagaCarroFactory_1.VagaCarroFactory();
        for (let i = 1; i <= 15; i++) {
            this.vagasCarro.push(factoryCarro.criarVaga(i));
        }
        const factoryMoto = new VagaMotoFactory_1.VagaMotoFactory();
        for (let i = 16; i <= 23; i++) {
            this.vagasMoto.push(factoryMoto.criarVaga(i));
        }
        const factoryCaminhao = new VagaCaminhaoFactory_1.VagaCaminhaoFactory();
        for (let i = 24; i <= 28; i++) {
            this.vagasCaminhao.push(factoryCaminhao.criarVaga(i));
        }
    }
    // --- Métodos de Vagas ---
    buscarVagaLivre(tipo) {
        return this.listarVagasPorTipo(tipo).find((v) => !v.isOcupada());
    }
    listarVagasPorTipo(tipo) {
        switch (tipo) {
            case TipoVeiculo_1.TipoVeiculo.CARRO:
                return this.vagasCarro;
            case TipoVeiculo_1.TipoVeiculo.MOTO:
                return this.vagasMoto;
            case TipoVeiculo_1.TipoVeiculo.CAMINHAO:
                return this.vagasCaminhao;
            default:
                return [];
        }
    }
    listarVagas() {
        return [...this.vagasCarro, ...this.vagasMoto, ...this.vagasCaminhao];
    }
    getFactory(tipo) {
        switch (tipo) {
            case TipoVeiculo_1.TipoVeiculo.CARRO:
                return new VagaCarroFactory_1.VagaCarroFactory();
            case TipoVeiculo_1.TipoVeiculo.MOTO:
                return new VagaMotoFactory_1.VagaMotoFactory();
            case TipoVeiculo_1.TipoVeiculo.CAMINHAO:
                return new VagaCaminhaoFactory_1.VagaCaminhaoFactory();
            default:
                return null;
        }
    }
    addVaga(tipo, numero) {
        const vagaExistente = this.listarVagas().find((v) => v.getNumero() === numero);
        if (vagaExistente) {
            return false;
        }
        const factory = this.getFactory(tipo);
        if (!factory) {
            return false;
        }
        const novaVaga = factory.criarVaga(numero);
        switch (tipo) {
            case TipoVeiculo_1.TipoVeiculo.CARRO:
                this.vagasCarro.push(novaVaga);
                return true;
            case TipoVeiculo_1.TipoVeiculo.MOTO:
                this.vagasMoto.push(novaVaga);
                return true;
            case TipoVeiculo_1.TipoVeiculo.CAMINHAO:
                this.vagasCaminhao.push(novaVaga);
                return true;
            default:
                return false;
        }
    }
    buscarVagaPorPlaca(placa) {
        return this.listarVagas().find((vaga) => vaga.getVeiculoEstacionado()?.getPlaca() === placa);
    }
    // --- método buscarVagaPorNumero ---
    buscarVagaPorNumero(numero) {
        return this.listarVagas().find(v => v.getNumero() === numero);
    }
    // --- Métodos de Veículos ---
    buscarVeiculoPorPlaca(placa) {
        return this.veiculosEstacionados.find((v) => v.getPlaca() === placa);
    }
    removerVeiculoPorPlaca(placa) {
        const index = this.veiculosEstacionados.findIndex((v) => v.getPlaca() === placa);
        if (index !== -1) {
            this.veiculosEstacionados.splice(index, 1);
            return true;
        }
        return false;
    }
    salvarVeiculoEstacionado(veiculo) {
        this.veiculosEstacionados.push(veiculo);
    }
    listarVeiculosEstacionados() {
        return this.veiculosEstacionados;
    }
    salvarVeiculoCadastrado(veiculo) {
        if (veiculo instanceof Carro_1.default)
            this.carrosDB.push(veiculo);
        else if (veiculo instanceof Moto_1.default)
            this.motosDB.push(veiculo);
        else if (veiculo instanceof Caminhao_1.default)
            this.caminhoesDB.push(veiculo);
    }
    listarTodosCadastrados() {
        return [...this.carrosDB, ...this.motosDB, ...this.caminhoesDB];
    }
    buscarVeiculosPorCpfCliente(cpf) {
        return this.listarTodosCadastrados().filter((veiculo) => veiculo.getCliente()?.getCpf() === cpf);
    }
    // --- Métodos de Clientes ---
    salvar(item) {
        this.clienteDB.push(item);
    }
    buscarPorId(id) {
        return this.clienteDB.find((cliente) => cliente.getCpf() === id);
    }
    listarTodos() {
        return this.clienteDB;
    }
    listarClientesOrdenadoPorNome() {
        return [...this.clienteDB].sort((a, b) => {
            return a.getNome().localeCompare(b.getNome());
        });
    }
    salvarCliente(cliente) {
        this.salvar(cliente);
    }
    listarClientes() {
        return this.listarTodos();
    }
    buscarPorCpf(cpf) {
        return this.buscarPorId(cpf);
    }
    atualizar(cpf, novosDados) {
        const cliente = this.buscarPorCpf(cpf);
        if (cliente) {
            if (novosDados.nome)
                cliente.setNome(novosDados.nome);
            if (novosDados.tipo)
                cliente.setTipo(novosDados.tipo);
            return cliente;
        }
        return null;
    }
    excluir(cpf) {
        const index = this.clienteDB.findIndex((cliente) => cliente.getCpf() === cpf);
        if (index !== -1) {
            this.clienteDB.splice(index, 1);
            return true;
        }
        return false;
    }
}
exports.default = Database;
