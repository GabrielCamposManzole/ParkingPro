import PromptSync from "prompt-sync";
import Cliente from "../model/Cliente";
import EstacionamentoController from "../control/EstacionamentoController";
import { ClientType } from "../model/ClientType";
import { TipoVeiculo } from "../model/TipoVeiculo";

export default class Cadastro {
      private controller: EstacionamentoController;
      private prompt = PromptSync();

      constructor(controller: EstacionamentoController) {
            this.controller = controller;
      }

      public cadastrarCliente(): void {
            console.log("\n=== Cadastro de Cliente ===");
            const nome = this.prompt("Nome: ");
            const cpf = this.prompt("CPF: ");
            let tipoInput = this.prompt("Tipo (1 - Mensalista | 2 - Avulso | 3 - Especial): ");
            
            const tiposPermitidos = Object.values(ClientType).filter(value => typeof value === 'number');
            let tipo: number = parseInt(tipoInput);

            while (!tiposPermitidos.includes(tipo)) {
                  tipoInput = this.prompt("Tipo inválido. Digite 1, 2 ou 3: ");
                  tipo = parseInt(tipoInput);
            }
            
            const novoCliente = this.controller.criarCliente(nome, cpf, tipo as ClientType);

            console.log("\nCliente cadastrado com sucesso!");
            console.log(`Nome: ${novoCliente.getNome()}`);
            console.log(`CPF: ${novoCliente.getCpf()}`);
            console.log(`Tipo: ${novoCliente.getTipo()}`);
      }
       
      public cadastrarVeiculo(): void {
            console.log("\n=== Cadastro de Veículo ===");

            const clientes = this.controller.database.clienteDB;
            if (clientes.length === 0) {
                console.log("Não há clientes cadastrados. Por favor, cadastre um cliente primeiro.");
                return;
            }

            let clienteSelecionado: Cliente | undefined;
            let clienteIndexInput = this.prompt("Selecione o número do cliente: ");
            let clienteIndex: number = parseInt(clienteIndexInput) - 1;

            while (isNaN(clienteIndex) || clienteIndex < 0 || clienteIndex >= clientes.length) {
                clienteIndexInput = this.prompt("Seleção inválida. Digite um número válido: ");
                clienteIndex = parseInt(clienteIndexInput) - 1;
            }
            clienteSelecionado = clientes[clienteIndex];

            const categoria = this.prompt("Categoria do veículo (carro/moto/caminhao): ").toLowerCase();
            const placa = this.prompt("Placa do veículo: ");
            const modelo = this.prompt("Modelo do veículo: ");
            const cor = this.prompt("Cor do veículo: ");

            switch (categoria) {
                case TipoVeiculo.CARRO:
                    this.controller.criarCarro(placa, modelo, cor, clienteSelecionado!);
                    break;
                case TipoVeiculo.MOTO:
                    this.controller.criarMoto(placa, modelo, cor, clienteSelecionado!);
                    break;
                case TipoVeiculo.CAMINHAO:
                    this.controller.criarCaminhao(placa, modelo, cor, clienteSelecionado!);
                    break;
                default:
                    console.log("Categoria inválida.");
                    return;
            }
            
            console.log("\nVeículo cadastrado com sucesso!");
            console.log(`Categoria: ${categoria}`);
            console.log(`Placa: ${placa}`);
            console.log(`Cliente: ${clienteSelecionado!.getNome()}`);
      }
}