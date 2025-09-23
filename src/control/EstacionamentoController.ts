import EstacionarVeiculoService from "../service/EstacionarVeiculoService";
import EstacionarVeiculoView from "../view/EstacionarVeiculoView";
import clienteView from "../view/ClienteView";
import TerminalView from "../view/TerminalView";
import Cliente from "../model/Cliente";
import CadastrarClieneteService from "../service/CadastrarClineteService";
import { ClientType } from "../model/ClientType";
import Carro from "../model/Carro";
import Moto from "../model/Moto";
import Caminhao from "../model/Caminhao";

import Veiculo from "../model/Veiculo";

export default class EstacionamentoController {
     public estacionarVeiculoService: EstacionarVeiculoService;
     public estacionarVeiculoView: EstacionarVeiculoView;
     public clienteView: clienteView;
     public cadastrarClienteService: CadastrarClieneteService = new CadastrarClieneteService(this);
     public terminalView: TerminalView;
     public veiculos: Veiculo[] = [];


     constructor() {
          this.estacionarVeiculoService = new EstacionarVeiculoService();
          this.estacionarVeiculoView = new EstacionarVeiculoView(this);
          this.clienteView = new clienteView(this);
          this.terminalView = new TerminalView(this);
          this.veiculos = new Array<Veiculo>();
     }

     public newCliente(nome: string, cpf: string, tipo: ClientType): Cliente {
          const cliente = new Cliente(nome, cpf, tipo);
          return cliente;
     }

     public estacionarVeiculo(placa: string, modelo: string, cor: string, tipo: string): boolean {
          let veiculo: Veiculo;
          if (tipo === "carro") {
               veiculo = new Carro(placa, modelo, cor);
          } else if (tipo === "moto") {
               veiculo = new Moto(placa, modelo, cor);
          } else if (tipo === "caminhao") {
               veiculo = new Caminhao(placa, modelo, cor);
          } else {
               return false;
          }
          const sucesso = this.estacionarVeiculoService.estacionarVeiculo(veiculo);
          if (sucesso) {
               this.veiculos.push(veiculo);
          }
          return sucesso;
     }
}