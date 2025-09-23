import PromptSync from "prompt-sync";
import EstacionamentoController from "../control/EstacionamentoController";

export default class CadastraCliente {
      private controller: EstacionamentoController;
      private prompt = PromptSync();

      constructor(controller: EstacionamentoController) {
            this.controller = controller;
      }

      public cadastrar(): void {

            console.log("\n=== Cadastro de Cliente Mensalista ===");
            const nome = this.prompt("Nome: ");
            const cpf = this.prompt("CPF: ");
            const tipo = 1; // Mensalista
            let categoria = this.prompt("Categoria do veículo (moto/carro/caminhao): ").toLowerCase();
            while (!["moto", "carro", "caminhao"].includes(categoria)) {
                  categoria = this.prompt("Categoria inválida. Digite moto, carro ou caminhao: ").toLowerCase();
            }
            const valorMensal = this.prompt("Valor mensal do veículo: ");

            const cliente = this.controller.newCliente(nome, cpf, tipo);
            console.log(`Cliente ${cliente.getNome()} cadastrado com sucesso!`);
            console.log(`Valor mensal: R$${valorMensal} | Categoria: ${categoria}`);
      }
}