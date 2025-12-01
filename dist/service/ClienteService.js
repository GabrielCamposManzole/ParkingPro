"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cliente_1 = __importDefault(require("../model/Cliente"));
const ClienteError_1 = require("../erros/ClienteError");
class ClienteService {
    repositorioClientes;
    constructor(repositorioClientes) {
        this.repositorioClientes = repositorioClientes;
    }
    criarCliente(nome, cpf, tipo) {
        try {
            if (!nome || !cpf) {
                throw new ClienteError_1.ClienteError("Nome e CPF são obrigatórios.");
            }
            const clienteExistente = this.repositorioClientes.buscarPorCpf(cpf);
            if (clienteExistente) {
                throw new ClienteError_1.ClienteError("Cliente com este CPF já existe.");
            }
            const novoCliente = new Cliente_1.default();
            novoCliente.setNome(nome);
            novoCliente.setCpf(cpf);
            novoCliente.setTipo(tipo);
            this.repositorioClientes.salvarCliente(novoCliente);
            return novoCliente;
        }
        catch (error) {
            if (error instanceof ClienteError_1.ClienteError) {
                throw error; // re-lança o erro personalizado
            }
            throw new ClienteError_1.ClienteError("Erro ao criar cliente: " + error.message);
        }
    }
    listarClientes() {
        try {
            return this.repositorioClientes.listarClientes();
        }
        catch (error) {
            throw new ClienteError_1.ClienteError("Erro ao listar clientes: " + error.message);
        }
    }
    buscarClientePorCpf(cpf) {
        try {
            return this.repositorioClientes.buscarPorCpf(cpf);
        }
        catch (error) {
            throw new ClienteError_1.ClienteError("Erro ao buscar cliente por CPF: " + error.message);
        }
    }
    listarClientesOrdenadoPorNome() {
        try {
            return this.repositorioClientes.listarClientesOrdenadoPorNome();
        }
        catch (error) {
            throw new ClienteError_1.ClienteError("Erro ao listar clientes ordenados: " + error.message);
        }
    }
    atualizarCliente(cpf, novosDados) {
        try {
            return this.repositorioClientes.atualizar(cpf, novosDados);
        }
        catch (error) {
            throw new ClienteError_1.ClienteError("Erro ao atualizar cliente: " + error.message);
        }
    }
    excluirCliente(cpf) {
        try {
            return this.repositorioClientes.excluir(cpf);
        }
        catch (error) {
            throw new ClienteError_1.ClienteError("Erro ao excluir cliente: " + error.message);
        }
    }
}
exports.default = ClienteService;
