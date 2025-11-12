"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/service/ClienteService.test.ts
const Cliente_1 = __importDefault(require("../model/Cliente"));
const ClientType_1 = require("../model/ClientType");
const ClienteError_1 = require("../erros/ClienteError");
const ClienteService_1 = __importDefault(require("./ClienteService"));
// --- CRIAÇÃO DO "DUBLÊ" (MOCK) ---
// Vamos criar um repositório falso que implementa a interface
// para podermos testar o Service de forma ISOLADA.
class MockRepositorioClientes {
    // Este repositório "falso" tem um cliente pré-existente
    clienteExistente;
    constructor() {
        this.clienteExistente = new Cliente_1.default();
        this.clienteExistente.setNome("Cliente Antigo");
        this.clienteExistente.setCpf("12345678900");
        this.clienteExistente.setTipo(ClientType_1.ClientType.AVULSO);
    }
    // Mock do método de busca
    buscarPorCpf(cpf) {
        if (cpf === "12345678900") {
            return this.clienteExistente;
        }
        return undefined;
    }
    // Métodos da interface que este teste não usa, mas precisam existir
    salvarCliente(cliente) { }
    listarClientes() { return []; }
    atualizar(cpf, novosDados) { return null; }
    excluir(cpf) { return true; }
    // Métodos genéricos (do passo 1)
    salvar(item) { }
    buscarPorId(id) { return this.buscarPorCpf(id); }
    listarTodos() { return []; }
    // Método de ordenação (do passo 2)
    listarClientesOrdenadoPorNome() { return []; }
}
// --- OS TESTES ---
// describe() agrupa um conjunto de testes
describe("ClienteService", () => {
    // it() define um caso de teste específico
    it("deve lançar um ClienteError ao tentar criar um cliente com CPF duplicado", () => {
        // 1. ARRANGE (Organizar)
        const mockRepo = new MockRepositorioClientes();
        const clienteService = new ClienteService_1.default(mockRepo); // <-- Injetando o MOCK
        // 2. ACT (Agir) & ASSERT (Verificar)
        // Nós esperamos que a função DENTRO do "expect()" LANCE UM ERRO
        expect(() => {
            clienteService.criarCliente("Cliente Novo", "12345678900", ClientType_1.ClientType.MENSALISTA);
        })
            .toThrow(ClienteError_1.ClienteError); // Verifica se o erro é do tipo ClienteError
        // E também podemos verificar a mensagem exata do erro
        expect(() => {
            clienteService.criarCliente("Cliente Novo", "12345678900", ClientType_1.ClientType.MENSALISTA);
        })
            .toThrow("Cliente com este CPF já existe.");
    });
    it("deve criar um cliente com sucesso se o CPF for novo", () => {
        // 1. ARRANGE (Organizar)
        const mockRepo = new MockRepositorioClientes();
        const clienteService = new ClienteService_1.default(mockRepo);
        // 2. ACT (Agir)
        // Usamos um CPF que o mock não vai encontrar ("999")
        const novoCliente = clienteService.criarCliente("Cliente Novo", "99988877700", ClientType_1.ClientType.AVULSO);
        // 3. ASSERT (Verificar)
        expect(novoCliente).toBeDefined(); // O cliente deve ter sido retornado
        expect(novoCliente.getNome()).toBe("Cliente Novo"); // O nome deve estar correto
        expect(novoCliente.getCpf()).toBe("99988877700"); // O CPF deve estar correto
    });
});
