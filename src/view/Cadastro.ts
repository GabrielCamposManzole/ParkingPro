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
            console.log(`Tipo: ${ClientType[novoCliente.getTipo()]}`); // Melhorado para mostrar o nome do tipo
      }
       
      // MÉTODO MODIFICADO para buscar cliente por CPF
      public cadastrarVeiculo(): void {
            console.log("\n=== Cadastro de Veículo para Cliente ===");

            if (this.controller.getClientesCadastrados() === 0) {
                console.log("Não há clientes cadastrados no sistema. Por favor, cadastre um cliente primeiro.");
                return;
            }

            const cpf = this.prompt("Digite o CPF do cliente proprietário do veículo: ");
            const clienteSelecionado = this.controller.buscarClientePorCpf(cpf);

            // Valida se o cliente foi encontrado
            if (!clienteSelecionado) {
                console.log(`\nErro: Nenhum cliente encontrado com o CPF '${cpf}'. Operação cancelada.`);
                return;
            }

            console.log(`Cliente encontrado: ${clienteSelecionado.getNome()}`);
            
            // Permite cadastrar vários carros em sequência para o mesmo cliente
            let continuarCadastrando = true;
            while (continuarCadastrando) {
                console.log("\n-- Adicionando novo veículo --");
                const categoriaInput = this.prompt("Categoria do veículo (carro, moto, caminhao): ").toLowerCase();
                const categoria = categoriaInput as TipoVeiculo;

                if (!Object.values(TipoVeiculo).includes(categoria)) {
                    console.log("Categoria inválida. Tente novamente.");
                    continue; // Pula para a próxima iteração do loop
                }

                const placa = this.prompt("Placa do veículo: ");
                const modelo = this.prompt("Modelo do veículo: ");
                const cor = this.prompt("Cor do veículo: ");

                switch (categoria) {
                    case TipoVeiculo.CARRO:
                        this.controller.criarCarro(placa, modelo, cor, clienteSelecionado);
                        break;
                    case TipoVeiculo.MOTO:
                        this.controller.criarMoto(placa, modelo, cor, clienteSelecionado);
                        break;
                    case TipoVeiculo.CAMINHAO:
                        this.controller.criarCaminhao(placa, modelo, cor, clienteSelecionado);
                        break;
                }
                
                console.log(`\nVeículo de placa ${placa} cadastrado com sucesso para ${clienteSelecionado.getNome()}!`);

                const resposta = this.prompt("Deseja cadastrar outro veículo para este mesmo cliente? (S/N): ").toUpperCase();
                if (resposta !== 'S') {
                    continuarCadastrando = false;
                }
            }
      }
}