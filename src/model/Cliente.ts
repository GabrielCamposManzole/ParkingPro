export default class Cliente {
  private nome: string;
  private cpf: string;
  private tipo : string;

    constructor(nome: string, cpf: string, tipo: "mensalista" | "avulso" ) {
        this.nome = nome;
        this.cpf = cpf;
        this.tipo = tipo;
    }
    

    public getNome(): string {
        return this.nome;
    } 
    public getCpf(): string {
        return this.cpf;
    }

    public getTipo(): string {
        return this.tipo;
    }
}