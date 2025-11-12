// src/service/ClienteService.test.ts
import Cliente from "../model/Cliente";
import { ClientType } from "../model/ClientType";
import { ClienteError } from "../erros/ClienteError";
import { IRepositorioClientes } from "../Repository/insterfaces/IRepositorioClientes";
import ClienteService from "./ClienteService";

// --- CRIAÇÃO DO "DUBLÊ" (MOCK) ---
// Vamos criar um repositório falso que implementa a interface
// para podermos testar o Service de forma ISOLADA.

class MockRepositorioClientes implements IRepositorioClientes {
    
    // Este repositório "falso" tem um cliente pré-existente
    clienteExistente: Cliente;

    constructor() {
        this.clienteExistente = new Cliente();
        this.clienteExistente.setNome("Cliente Antigo");
        this.clienteExistente.setCpf("12345678900");
        this.clienteExistente.setTipo(ClientType.AVULSO);
    }

    // Mock do método de busca
    public buscarPorCpf(cpf: string): Cliente | undefined {
        if (cpf === "12345678900") {
            return this.clienteExistente;
        }
        return undefined;
    }

    // Métodos da interface que este teste não usa, mas precisam existir
    public salvarCliente(cliente: Cliente): void {}
    public listarClientes(): Cliente[] { return []; }
    public atualizar(cpf: string, novosDados: any): Cliente | null { return null; }
    public excluir(cpf: string): boolean { return true; }
    
    // Métodos genéricos (do passo 1)
    public salvar(item: Cliente): void {}
    public buscarPorId(id: string): Cliente | undefined { return this.buscarPorCpf(id); }
    public listarTodos(): Cliente[] { return []; }

    // Método de ordenação (do passo 2)
    public listarClientesOrdenadoPorNome(): Cliente[] { return []; }
}


// --- OS TESTES ---

// describe() agrupa um conjunto de testes
describe("ClienteService", () => {

    // it() define um caso de teste específico
    it("deve lançar um ClienteError ao tentar criar um cliente com CPF duplicado", () => {
        
        // 1. ARRANGE (Organizar)
        const mockRepo = new MockRepositorioClientes();
        const clienteService = new ClienteService(mockRepo); // <-- Injetando o MOCK

        // 2. ACT (Agir) & ASSERT (Verificar)
        
        // Nós esperamos que a função DENTRO do "expect()" LANCE UM ERRO
        expect(() => {
            clienteService.criarCliente("Cliente Novo", "12345678900", ClientType.MENSALISTA);
        })
        .toThrow(ClienteError); // Verifica se o erro é do tipo ClienteError

        // E também podemos verificar a mensagem exata do erro
        expect(() => {
            clienteService.criarCliente("Cliente Novo", "12345678900", ClientType.MENSALISTA);
        })
        .toThrow("Cliente com este CPF já existe.");
    });


    it("deve criar um cliente com sucesso se o CPF for novo", () => {
        
        // 1. ARRANGE (Organizar)
        const mockRepo = new MockRepositorioClientes();
        const clienteService = new ClienteService(mockRepo);

        // 2. ACT (Agir)
        // Usamos um CPF que o mock não vai encontrar ("999")
        const novoCliente = clienteService.criarCliente("Cliente Novo", "99988877700", ClientType.AVULSO);

        // 3. ASSERT (Verificar)
        expect(novoCliente).toBeDefined(); // O cliente deve ter sido retornado
        expect(novoCliente.getNome()).toBe("Cliente Novo"); // O nome deve estar correto
        expect(novoCliente.getCpf()).toBe("99988877700"); // O CPF deve estar correto
    });

});