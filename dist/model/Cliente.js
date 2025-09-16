"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cliente {
    nome;
    cpf;
    tipo;
    constructor(nome, cpf, tipo) {
        this.cpf = cpf;
        this.tipo = tipo;
        this.nome = nome;
    }
    getNome() {
        return this.nome;
    }
    getCpf() {
        return this.cpf;
    }
    getTipo() {
        return this.tipo;
    }
}
exports.default = Cliente;
