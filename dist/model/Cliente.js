"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cliente {
    nome;
    cpf;
    tipo;
    // constructor(nome: string, cpf: string, tipo: ClientType) {
    //     this.cpf = cpf;
    //     this.tipo = tipo;
    //     this.nome = nome;
    // }
    getNome() {
        return this.nome;
    }
    setNome(nome) {
        this.nome = nome;
    }
    setCpf(cpf) {
        this.cpf = cpf;
    }
    getCpf() {
        return this.cpf;
    }
    getTipo() {
        return this.tipo;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }
}
exports.default = Cliente;
