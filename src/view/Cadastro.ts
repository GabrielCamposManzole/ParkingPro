import PromptSync from "prompt-sync";
import Cliente from "../model/Cliente";
import EstacionamentoController from "../control/EstacionamentoController";
import { ClientType } from "../model/ClientType"; // Importação do enum ClientType

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
            let tipo = this.prompt("Tipo (1 - Mensalista | 2 - Avulso | 3 - Especial): ");
            
            // Validação aprimorada usando o enum ClientType
            while (!Object.values(ClientType).includes(parseInt(tipo))) {
                  tipo = this.prompt("Tipo inválido. Digite 1, 2 ou 3: ");
            }
            
            novoCliente.setTipo(parseInt(tipo) as ClientType);
            console.log("\nCliente cadastrado com sucesso!");
            console.log(`Nome: ${novoCliente.getNome()}`);
            console.log(`CPF: ${novoCliente.getCpf()}`);
            console.log(`Tipo: ${novoCliente.getTipo()}`);
            // agora armazenar no banco.
            this.controller.database.clienteDB.push(novoCliente);
      }
       
      public cadastrarVeiculo(): void {
          // pede um carro para controller
              let novoVeiculo = this.controller.getNewVeiculo();
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