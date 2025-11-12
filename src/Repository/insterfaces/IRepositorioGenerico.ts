/*
  Define um contrato de Repositório genérico (CRUD)
  @param T O tipo da Entidade (ex: Cliente, Veiculo)
  @param K O tipo da Chave Primária (ex: string para CPF)
 */

  
export interface IRepositorioGenerico<T, K> {
    
    // Create
    salvar(item: T): void;
    
    // Read
    buscarPorId(id: K): T | undefined;
    listarTodos(): T[];

    // Delete
    excluir(id: K): boolean;
}