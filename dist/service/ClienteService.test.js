"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cliente_1 = __importDefault(require("../model/Cliente"));
const ClientType_1 = require("../model/ClientType");
const ClienteError_1 = require("../erros/ClienteError");
const ClienteService_1 = __importDefault(require("./ClienteService"));
class MockRepositorioClientes {
    clienteExistente;
    constructor() {
        this.clienteExistente = new Cliente_1.default();
        this.clienteExistente.setNome("Cliente Antigo");
        this.clienteExistente.setCpf("12345678900");
        this.clienteExistente.setTipo(ClientType_1.ClientType.AVULSO);
    }
    buscarPorCpf(cpf) {
        if (cpf === "12345678900") {
            return this.clienteExistente;
        }
        return undefined;
    }
    salvarCliente(cliente) { }
    listarClientes() { return []; }
    atualizar(cpf, novosDados) { return null; }
    excluir(cpf) { return true; }
    salvar(item) { }
    buscarPorId(id) { return this.buscarPorCpf(id); }
    listarTodos() { return []; }
    listarClientesOrdenadoPorNome() { return []; }
}
describe("ClienteService", () => {
    it("deve lançar um ClienteError ao tentar criar um cliente com CPF duplicado", () => {
        const mockRepo = new MockRepositorioClientes();
        const clienteService = new ClienteService_1.default(mockRepo);
        expect(() => {
            clienteService.criarCliente("Cliente Novo", "12345678900", ClientType_1.ClientType.MENSALISTA);
        })
            .toThrow(ClienteError_1.ClienteError);
        expect(() => {
            clienteService.criarCliente("Cliente Novo", "12345678900", ClientType_1.ClientType.MENSALISTA);
        })
            .toThrow("Cliente com este CPF já existe.");
    });
    it("deve criar um cliente com sucesso se o CPF for novo", () => {
        const mockRepo = new MockRepositorioClientes();
        const clienteService = new ClienteService_1.default(mockRepo);
        //  CPF que o mock não vai encontrar ("999")
        const novoCliente = clienteService.criarCliente("Cliente Novo", "99988877700", ClientType_1.ClientType.AVULSO);
        // 3. ASSERT (Verificar)
        expect(novoCliente).toBeDefined(); // O cliente deve ter sido retornado
        expect(novoCliente.getNome()).toBe("Cliente Novo"); // O nome deve estar correto
        expect(novoCliente.getCpf()).toBe("99988877700"); // O CPF deve estar correto
    });
});
