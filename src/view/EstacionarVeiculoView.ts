import PromptSync from "prompt-sync";
import EstacionamentoController from "../control/EstacionamentoController";

export default class EstacionarVeiculoView {
  private prompt: PromptSync.Prompt;
  private controller: EstacionamentoController;
  
  constructor(controller: EstacionamentoController) {
    this.prompt = PromptSync();
    this.controller = controller;
  }

  public fluxoEstacionar(): void {
    


  }
}

