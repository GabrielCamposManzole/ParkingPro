import { ClientType } from "./ClientType";

export default class Cliente {
    private nome!: string;
    private cpf!: string;
    private tipo!: ClientType;

    // constructor(nome: string, cpf: string, tipo: ClientType) {
    //     this.cpf = cpf;
    //     this.tipo = tipo;
    //     this.nome = nome;
    // }


    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public setCpf(cpf: string): void {
        this.cpf = cpf;
    }
    public getCpf(): string {
        return this.cpf;
    }

    public getTipo(): number {
        return this.tipo;
    }

    public setTipo(tipo: ClientType): void {
        this.tipo = tipo;
    }




}