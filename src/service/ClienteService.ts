import { IClienteService } from "../Repository/insterfaces/IClienteService";
import { IRepositorioClientes } from "../Repository/insterfaces/IRepositorioClientes";
import Cliente from "../model/Cliente";
import { ClientType } from "../model/ClientType";

/**
 * Implementa a lógica de negócio para o gerenciamento de clientes.
 * Depende de uma abstração (IRepositorioClientes) para persistir os dados.
 */
export default class ClienteService implements IClienteService {
    
    // Injeção de Dependência via construtor.
    // O 'private readonly' é um atalho do TypeScript para declarar e atribuir a propriedade.
    constructor(private readonly repositorioClientes: IRepositorioClientes) {}

    public criarCliente(nome: string, cpf: string, tipo: ClientType): Cliente {
        if (!nome || !cpf) {
            throw new Error("Nome e CPF são obrigatórios.");
        }
        const clienteExistente = this.repositorioClientes.buscarPorCpf(cpf);
        if (clienteExistente) {
            throw new Error("Cliente com este CPF já existe.");
        }
        
        const novoCliente = new Cliente();
        novoCliente.setNome(nome);
        novoCliente.setCpf(cpf);
        novoCliente.setTipo(tipo);
        
        this.repositorioClientes.salvarCliente(novoCliente);
        return novoCliente;
    }

    public listarClientes(): Cliente[] {
        return this.repositorioClientes.listarClientes();
    }
    
    public buscarClientePorCpf(cpf: string): Cliente | undefined {
        return this.repositorioClientes.buscarPorCpf(cpf);
    }
 
    public atualizarCliente(cpf: string, novosDados: { nome: string; tipo: ClientType; }): Cliente | null {
        return this.repositorioClientes.atualizar(cpf, novosDados);
    }
    
    public excluirCliente(cpf: string): boolean {
        return this.repositorioClientes.excluir(cpf);
    }
}