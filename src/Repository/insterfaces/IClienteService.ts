import Cliente from "../../model/Cliente";
import { ClientType } from "../../model/ClientType";


export interface IClienteService {
    criarCliente(nome: string, cpf: string, tipo: ClientType): Cliente;
    listarClientes(): Cliente[];
    buscarClientePorCpf(cpf: string): Cliente | undefined;
    atualizarCliente(cpf: string, novosDados: { nome: string; tipo: ClientType; }): Cliente | null;
    excluirCliente(cpf: string): boolean;
    
}