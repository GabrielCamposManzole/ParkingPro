
import Cliente from "../../model/Cliente";
import { ClientType } from "../../model/ClientType";
import { IRepositorioGenerico } from "./IRepositorioGenerico"; // <-- 1. IMPORTE AQUI


export interface IRepositorioClientes extends IRepositorioGenerico<Cliente, string> { 

    salvarCliente(cliente: Cliente): void;
    listarClientes(): Cliente[];
    buscarPorCpf(cpf: string): Cliente | undefined;
    atualizar(cpf: string, novosDados: { nome: string, tipo: ClientType }): Cliente | null;
    listarClientesOrdenadoPorNome(): Cliente[];
}