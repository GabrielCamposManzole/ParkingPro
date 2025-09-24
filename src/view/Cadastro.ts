import PromptSync from "prompt-sync";

import Cliente from "../model/Cliente";
import EstacionamentoController from "../control/EstacionamentoController";

export default class Cadastro {
      private controller: EstacionamentoController;
      private prompt = PromptSync();

      constructor(controller: EstacionamentoController) {
            this.controller = controller;
      }

      public cadastrarCliente(): void {

            let novoCliente: Cliente = this.controller.getNewCliente();
            console.log("\n=== Cadastro de Cliente Mensalista ===");
            novoCliente.setNome(this.prompt("Nome: "));
            novoCliente.setCpf(this.prompt("CPF: "));
            let tipo = this.prompt("Tipo (1 - Comum | 2 - Vip | 3 - Premium): ");
            while (!["1", "2", "3"].includes(tipo)) {
                  tipo = this.prompt("Tipo inválido. Digite 1, 2 ou 3: ");
            }
            // aqui o cliente está com os valores do usuário
            novoCliente.setTipo(parseInt(tipo) as any); // Type assertion to ClientType enum
            console.log("\nCliente cadastrado com sucesso!");
            console.log(`Nome: ${novoCliente.getNome()}`);
            console.log(`CPF: ${novoCliente.getCpf()}`);
            console.log(`Tipo: ${novoCliente.getTipo()}`);
            // agora armazenar no banco.
            this.controller.database.clienteDB.push(novoCliente);
      }
       
      public cadastrarVeiculo(): void {
          // pede um carro para controller
          // listar os clientes para user escolher
          // pede ao user a categoria do carro
          // pede os demais daddos ao user
          // popula o carro recebido pelo controller
          // pede ao controller para armazenar o carro no db
     
      let categoria = this.prompt("Categoria do veículo (moto/carro/caminhao): ").toLowerCase();
            while (!["moto", "carro", "caminhao"].includes(categoria)) {
                  categoria = this.prompt("Categoria inválida. Digite moto, carro ou caminhao: ").toLowerCase();
            }
            const valorMensal = this.prompt("Valor mensal do veículo: ");

            console.log("\nVeículo cadastrado com sucesso!");
            console.log(`Categoria: ${categoria}`);
            console.log(`Valor Mensal: ${valorMensal}`);
      }
}