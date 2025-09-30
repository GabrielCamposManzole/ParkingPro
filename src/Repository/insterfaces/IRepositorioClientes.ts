import Cliente from "../../model/Cliente";
import { ClientType } from "../../model/ClientType";

export interface IRepositorioClientes {
    salvarCliente(cliente: Cliente): void;
    listarClientes(): Cliente[];
    
   
    buscarPorCpf(cpf: string): Cliente | undefined;
    atualizar(cpf: string, novosDados: { nome: string, tipo: ClientType }): Cliente | null;
    excluir(cpf: string): boolean;
}