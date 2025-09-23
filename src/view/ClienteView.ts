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
      console.log("\n=== Menu do Estacionamento ===");
      console.log("                     ");
      console.log("1. Cadastro de Cliente");
      console.log("2. Listar Clientes");
      console.log("6. Sair");

      const escolha = this.prompt("Escolha uma opção: ");

      switch (escolha) {
        case "1":
          this.controller.cadastrarClienteService.cadastrar();
          break;
        case "2":
           console
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