
import Cliente from "../model/Cliente";
import { ClientType } from "../model/ClientType";
import { ClienteError } from "../erros/ClienteError";
import { IRepositorioClientes } from "../Repository/insterfaces/IRepositorioClientes";
import ClienteService from "./ClienteService";


class MockRepositorioClientes implements IRepositorioClientes {
    
   
    clienteExistente: Cliente;

    constructor() {
        this.clienteExistente = new Cliente();
        this.clienteExistente.setNome("Cliente Antigo");
        this.clienteExistente.setCpf("12345678900");
        this.clienteExistente.setTipo(ClientType.AVULSO);
    }

 
    public buscarPorCpf(cpf: string): Cliente | undefined {
        if (cpf === "12345678900") {
            return this.clienteExistente;
        }
        return undefined;
    }

    
    public salvarCliente(cliente: Cliente): void {}
    public listarClientes(): Cliente[] { return []; }
    public atualizar(cpf: string, novosDados: any): Cliente | null { return null; }
    public excluir(cpf: string): boolean { return true; }
    
  
    public salvar(item: Cliente): void {}
    public buscarPorId(id: string): Cliente | undefined { return this.buscarPorCpf(id); }
    public listarTodos(): Cliente[] { return []; }

    public listarClientesOrdenadoPorNome(): Cliente[] { return []; }
}



describe("ClienteService", () => {


    it("deve lançar um ClienteError ao tentar criar um cliente com CPF duplicado", () => {
        
       
        const mockRepo = new MockRepositorioClientes();
        const clienteService = new ClienteService(mockRepo); 

        
        expect(() => {
            clienteService.criarCliente("Cliente Novo", "12345678900", ClientType.MENSALISTA);
        })
        .toThrow(ClienteError); 
        expect(() => {
            clienteService.criarCliente("Cliente Novo", "12345678900", ClientType.MENSALISTA);
        })
        .toThrow("Cliente com este CPF já existe.");
    });


    it("deve criar um cliente com sucesso se o CPF for novo", () => {
        
       
        const mockRepo = new MockRepositorioClientes();
        const clienteService = new ClienteService(mockRepo);

        
        //  CPF que o mock não vai encontrar ("999")
        const novoCliente = clienteService.criarCliente("Cliente Novo", "99988877700", ClientType.AVULSO);

        // 3. ASSERT (Verificar)
        expect(novoCliente).toBeDefined(); // O cliente deve ter sido retornado
        expect(novoCliente.getNome()).toBe("Cliente Novo"); // O nome deve estar correto
        expect(novoCliente.getCpf()).toBe("99988877700"); // O CPF deve estar correto
    });

});