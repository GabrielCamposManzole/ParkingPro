"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const ClientType_1 = require("../model/ClientType");
class CadastrarClieneteService {
    controller;
    prompt = (0, prompt_sync_1.default)();
    constructor(controller) {
        this.controller = controller;
    }
    cadastrar() {
        console.log("\n=== Cadastro de Cliente Mensalista ===");
        const nome = this.prompt("Nome: ");
        const cpf = this.prompt("CPF: ");
        let tipoInput = this.prompt("Tipo (1 - Mensalista | 2 - Avulso | 3 - Especial): ");
        const tiposPermitidos = Object.values(ClientType_1.ClientType).filter(value => typeof value === 'number');
        let tipo = parseInt(tipoInput);
        while (!tiposPermitidos.includes(tipo)) {
            tipoInput = this.prompt("Tipo inválido. Digite 1, 2 ou 3: ");
            tipo = parseInt(tipoInput);
        }
        const cliente = this.controller.criarCliente(nome, cpf, tipo);
        console.log(`Cliente ${cliente.getNome()} cadastrado com sucesso!`);
    }
}
exports.default = CadastrarClieneteService;
