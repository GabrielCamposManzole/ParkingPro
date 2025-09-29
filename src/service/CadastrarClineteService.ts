import PromptSync from "prompt-sync";
import EstacionamentoController from "../control/EstacionamentoController";
import { ClientType } from "../model/ClientType";

export default class CadastrarClieneteService {
    private controller: EstacionamentoController;
    private prompt = PromptSync();

    constructor(controller: EstacionamentoController) {
        this.controller = controller;
    }

    public cadastrar(): void {
        console.log("\n=== Cadastro de Cliente Mensalista ===");
        const nome = this.prompt("Nome: ");
        const cpf = this.prompt("CPF: ");
        let tipoInput = this.prompt("Tipo (1 - Mensalista | 2 - Avulso | 3 - Especial): ");

        const tiposPermitidos = Object.values(ClientType).filter(value => typeof value === 'number');
        let tipo: number = parseInt(tipoInput);

        while (!tiposPermitidos.includes(tipo)) {
            tipoInput = this.prompt("Tipo inválido. Digite 1, 2 ou 3: ");
            tipo = parseInt(tipoInput);
        }

        const cliente = this.controller.criarCliente(nome, cpf, tipo as ClientType);
        
        console.log(`Cliente ${cliente.getNome()} cadastrado com sucesso!`);
    }
}