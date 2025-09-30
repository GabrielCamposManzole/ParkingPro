"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Carro_1 = __importDefault(require("../model/Carro"));
const Caminhao_1 = __importDefault(require("../model/Caminhao"));
const Moto_1 = __importDefault(require("../model/Moto"));
const Vaga_1 = __importDefault(require("../model/Vaga"));
const TipoVeiculo_1 = require("../model/TipoVeiculo");
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
        for (let i = 1; i <= 15; i++)
            this.vagasCarro.push(new Vaga_1.default(i, TipoVeiculo_1.TipoVeiculo.CARRO));
        for (let i = 16; i <= 23; i++)
            this.vagasMoto.push(new Vaga_1.default(i, TipoVeiculo_1.TipoVeiculo.MOTO));
        for (let i = 24; i <= 28; i++)
            this.vagasCaminhao.push(new Vaga_1.default(i, TipoVeiculo_1.TipoVeiculo.CAMINHAO));
    }
    // --- Implementação IRepositorioVagas ---
    buscarVagaLivre(tipo) {
        return this.listarVagasPorTipo(tipo).find(v => !v.isOcupada());
    }
    listarVagasPorTipo(tipo) {
        switch (tipo) {
            case TipoVeiculo_1.TipoVeiculo.CARRO: return this.vagasCarro;
            case TipoVeiculo_1.TipoVeiculo.MOTO: return this.vagasMoto;
            case TipoVeiculo_1.TipoVeiculo.CAMINHAO: return this.vagasCaminhao;
            default: return [];
        }
    }
    listarVagas() {
        return [...this.vagasCarro, ...this.vagasMoto, ...this.vagasCaminhao];
    }
    addVaga(tipo, numero) {
        const vagaExistente = this.listarVagas().find(v => v.getNumero() === numero);
        if (vagaExistente) {
            return false; // Vaga já existe
        }
        const novaVaga = new Vaga_1.default(numero, tipo);
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
            default: return false;
        }
    }
    buscarVagaPorPlaca(placa) {
        return this.listarVagas().find(vaga => vaga.getVeiculoEstacionado()?.getPlaca() === placa);
    }
    // --- Implementação IRepositorioVeiculos ---
    buscarVeiculoPorPlaca(placa) {
        return this.veiculosEstacionados.find(v => v.getPlaca() === placa);
    }
    removerVeiculoPorPlaca(placa) {
        const index = this.veiculosEstacionados.findIndex(v => v.getPlaca() === placa);
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
        return this.listarTodosCadastrados().filter(veiculo => veiculo.getCliente()?.getCpf() === cpf);
    }
    // --- Implementação IRepositorioClientes ---
    salvarCliente(cliente) {
        this.clienteDB.push(cliente);
    }
    listarClientes() {
        return this.clienteDB;
    }
    buscarPorCpf(cpf) {
        return this.clienteDB.find(cliente => cliente.getCpf() === cpf);
    }
    atualizar(cpf, novosDados) {
        const cliente = this.buscarPorCpf(cpf);
        if (cliente) {
            cliente.setNome(novosDados.nome);
            cliente.setTipo(novosDados.tipo);
            return cliente;
        }
        return null;
    }
    excluir(cpf) {
        const index = this.clienteDB.findIndex(cliente => cliente.getCpf() === cpf);
        if (index !== -1) {
            this.clienteDB.splice(index, 1);
            return true;
        }
        return false;
    }
}
exports.default = Database;
