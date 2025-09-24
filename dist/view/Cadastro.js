"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
class Cadastro {
    controller;
    prompt = (0, prompt_sync_1.default)();
    constructor(controller) {
        this.controller = controller;
    }
    cadastrarCliente() {
        let novoCliente = this.controller.getNewCliente();
        console.log("\n=== Cadastro de Cliente Mensalista ===");
        novoCliente.setNome(this.prompt("Nome: "));
        novoCliente.setCpf(this.prompt("CPF: "));
        let tipo = this.prompt("Tipo (1 - Comum | 2 - Vip | 3 - Premium): ");
        while (!["1", "2", "3"].includes(tipo)) {
            tipo = this.prompt("Tipo inválido. Digite 1, 2 ou 3: ");
        }
        // aqui o cliente está com os valores do usuário
        novoCliente.setTipo(parseInt(tipo)); // Type assertion to ClientType enum
        console.log("\nCliente cadastrado com sucesso!");
        console.log(`Nome: ${novoCliente.getNome()}`);
        console.log(`CPF: ${novoCliente.getCpf()}`);
        console.log(`Tipo: ${novoCliente.getTipo()}`);
        // agora armazenar no banco.
        this.controller.database.clienteDB.push(novoCliente);
    }
    cadastrarVeiculo() {
        // pede um carro para controller
        let novoVeiculo = this.controller.getNewVehicle();
        // listar os clientes para user escolher
        console.log("\n=== Cadastro de Veículo ===");
        console.log("Clientes cadastrados:");
        this.controller.database.clienteDB.forEach((cliente, index) => {
            console.log(`${index + 1}. ${cliente.getNome()} (CPF: ${cliente.getCpf()})`);
        });
        let clienteIndex = parseInt(this.prompt("Selecione o cliente pelo número: ")) - 1;
        while (isNaN(clienteIndex) || clienteIndex < 0 || clienteIndex >= this.controller.database.clienteDB.length) {
            clienteIndex = parseInt(this.prompt("Seleção inválida. Selecione o cliente pelo número: ")) - 1;
        }
        let clienteSelecionado = this.controller.database.clienteDB[clienteIndex];
        novoVeiculo.setCliente(clienteSelecionado);
        // pede ao user a categoria do carro
        let categoria = this.prompt("Categoria do veículo (moto/carro/caminhao): ").toLowerCase();
        while (!["moto", "carro", "caminhao"].includes(categoria)) {
            categoria = this.prompt("Categoria inválida. Digite moto, carro ou caminhao: ").toLowerCase();
        }
        // pede os demais daddos ao user
        novoVeiculo.setModelo(this.prompt("Modelo do veículo: "));
        novoVeiculo.setPlaca(this.prompt("Placa do veículo: "));
        novoVeiculo.setCategoria(categoria);
        // popula o carro recebido pelo controller
        // pede ao controller para armazenar o carro no db
        this.controller.database.veiculoDB.push(novoVeiculo);
        console.log("\nVeículo cadastrado com sucesso!");
        console.log(`Modelo: ${novoVeiculo.getModelo()}`);
        console.log(`Placa: ${novoVeiculo.getPlaca()}`);
        console.log(`Categoria: ${novoVeiculo.getCategoria()}`);
    }
}
exports.default = Cadastro;
