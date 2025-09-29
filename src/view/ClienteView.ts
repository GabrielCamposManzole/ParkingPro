import PromptSync from "prompt-sync";
import EstacionamentoController from "../control/EstacionamentoController";

export default class clienteView {
      private prompt: PromptSync.Prompt;
      private controller: EstacionamentoController;

      constructor(controller: EstacionamentoController) {
          this.prompt = PromptSync();
          this.controller = controller;
      }

      public clienteC(): void {
    let continues: boolean = true;
    while (continues) {
      console.log("\n=== Menu de Clientes ===");
      console.log("1. Cadastro de Cliente");
      console.log("2. Listar Clientes");
      console.log("6. Sair");

      const escolha = this.prompt("Escolha uma opção: ");

      switch (escolha) {
        case "1":
          this.controller.cadastraCliente.cadastrarCliente();
          break;
        case "2":
           console.log("\n=== Lista de Clientes ===");
           const clientes = this.controller.listarClientes();
           if (clientes.length === 0) {
               console.log("Nenhum cliente cadastrado.");
           } else {
               clientes.forEach((cliente, index) => {
                   console.log(`${index + 1}. Nome: ${cliente.getNome()}, CPF: ${cliente.getCpf()}`);
               });
           }
           break;
        case "6":
          console.log("Saindo...");
          continues = false;
          break;
        default:
          console.log("Opção inválida. Tente novamente.");
      }
    }
  }
}