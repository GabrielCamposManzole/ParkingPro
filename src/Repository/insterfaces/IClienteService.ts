import Cliente from "../../model/Cliente";
import { ClientType } from "../../model/ClientType";

/**
 * Define o contrato para o serviço de gerenciamento de clientes.
 * Qualquer classe que implemente esta interface será responsável pela lógica de negócio dos clientes.
 */
export interface IClienteService {
    criarCliente(nome: string, cpf: string, tipo: ClientType): Cliente;
    listarClientes(): Cliente[];
    buscarClientePorCpf(cpf: string): Cliente | undefined;
    atualizarCliente(cpf: string, novosDados: { nome: string; tipo: ClientType; }): Cliente | null;
    excluirCliente(cpf: string): boolean;
    
}