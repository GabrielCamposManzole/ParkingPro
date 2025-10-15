import { IClienteService } from "../Repository/insterfaces/IClienteService";
import { IRepositorioClientes } from "../Repository/insterfaces/IRepositorioClientes";
import Cliente from "../model/Cliente";
import { ClientType } from "../model/ClientType";
import { ClienteError } from "../erros/ClienteError";


export default class ClienteService implements IClienteService {

    constructor(private readonly repositorioClientes: IRepositorioClientes) {}

    public criarCliente(nome: string, cpf: string, tipo: ClientType): Cliente {
        try {
            if (!nome || !cpf) {
                throw new ClienteError("Nome e CPF são obrigatórios.");
            }

            const clienteExistente = this.repositorioClientes.buscarPorCpf(cpf);
            if (clienteExistente) {
                throw new ClienteError("Cliente com este CPF já existe.");
            }

            const novoCliente = new Cliente();
            novoCliente.setNome(nome);
            novoCliente.setCpf(cpf);
            novoCliente.setTipo(tipo);

            this.repositorioClientes.salvarCliente(novoCliente);
            return novoCliente;

        } catch (error) {
            if (error instanceof ClienteError) {
                throw error; // re-lança o erro personalizado
            }
            throw new ClienteError("Erro ao criar cliente: " + (error as Error).message);
        }
    }

    public listarClientes(): Cliente[] {
        try {
            return this.repositorioClientes.listarClientes();
        } catch (error) {
            throw new ClienteError("Erro ao listar clientes: " + (error as Error).message);
        }
    }

    public buscarClientePorCpf(cpf: string): Cliente | undefined {
        try {
            return this.repositorioClientes.buscarPorCpf(cpf);
        } catch (error) {
            throw new ClienteError("Erro ao buscar cliente por CPF: " + (error as Error).message);
        }
    }

    public atualizarCliente(cpf: string, novosDados: { nome: string; tipo: ClientType; }): Cliente | null {
        try {
            return this.repositorioClientes.atualizar(cpf, novosDados);
        } catch (error) {
            throw new ClienteError("Erro ao atualizar cliente: " + (error as Error).message);
        }
    }

    public excluirCliente(cpf: string): boolean {
        try {
            return this.repositorioClientes.excluir(cpf);
        } catch (error) {
            throw new ClienteError("Erro ao excluir cliente: " + (error as Error).message);
        }
    }
}
