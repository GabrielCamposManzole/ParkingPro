
  
export interface IRepositorioGenerico<T, K> {
    
    salvar(item: T): void;
    buscarPorId(id: K): T | undefined;
    listarTodos(): T[];
    excluir(id: K): boolean;
}