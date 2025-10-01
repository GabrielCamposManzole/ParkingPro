"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cliente_1 = __importDefault(require("../model/Cliente"));
/**
 * Implementa a lógica de negócio para o gerenciamento de clientes.
 * Depende de uma abstração (IRepositorioClientes) para persistir os dados.
 */
class ClienteService {
    repositorioClientes;
    // Injeção de Dependência via construtor.
    // O 'private readonly' é um atalho do TypeScript para declarar e atribuir a propriedade.
    constructor(repositorioClientes) {
        this.repositorioClientes = repositorioClientes;
    }
    criarCliente(nome, cpf, tipo) {
        if (!nome || !cpf) {
            throw new Error("Nome e CPF são obrigatórios.");
        }
        const clienteExistente = this.repositorioClientes.buscarPorCpf(cpf);
        if (clienteExistente) {
            throw new Error("Cliente com este CPF já existe.");
        }
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
}
exports.default = ClienteService;
