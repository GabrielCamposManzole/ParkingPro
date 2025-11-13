import Carro from "../model/Carro";
import Cliente from "../model/Cliente";
import Caminhao from "../model/Caminhao";
import Moto from "../model/Moto";
import Vaga from "../model/Vaga";
import Veiculo from "../model/Veiculo";
import { TipoVeiculo } from "../model/TipoVeiculo";
import { ClientType } from "../model/ClientType";

import { IRepositorioVagas } from "../Repository/insterfaces/IRepositorioVagas";
import { IRepositorioVeiculos } from "../Repository/insterfaces/IRepositorioVeiculos";
import { IRepositorioClientes } from "../Repository/insterfaces/IRepositorioClientes";

import { VagaFactory } from "../model/factory/VagaFactory";
import { VagaCarroFactory } from "../model/factory/VagaCarroFactory";
import { VagaMotoFactory } from "../model/factory/VagaMotoFactory";
import { VagaCaminhaoFactory } from "../model/factory/VagaCaminhaoFactory";


export default class Database implements IRepositorioVagas, IRepositorioVeiculos, IRepositorioClientes {

   public carrosDB: Carro[] = [];
   public motosDB: Moto[] = [];
   public caminhoesDB: Caminhao[] = [];
   public clienteDB: Cliente[] = [];
   public vagasCarro: Vaga[] = [];
   public vagasMoto: Vaga[] = [];
   public vagasCaminhao: Vaga[] = [];
   
   private veiculosEstacionados: Veiculo[] = [];

   constructor() {
     
     const factoryCarro = new VagaCarroFactory();
     for (let i = 1; i <= 15; i++) {
         this.vagasCarro.push(factoryCarro.criarVaga(i));
     }

     const factoryMoto = new VagaMotoFactory();
     for (let i = 16; i <= 23; i++) {
         this.vagasMoto.push(factoryMoto.criarVaga(i));
     }
     
     const factoryCaminhao = new VagaCaminhaoFactory();
     for (let i = 24; i <= 28; i++) {
         this.vagasCaminhao.push(factoryCaminhao.criarVaga(i));
     }
   }
   
   // --- Métodos de Vagas ---

   public buscarVagaLivre(tipo: TipoVeiculo): Vaga | undefined {
        return this.listarVagasPorTipo(tipo).find(v => !v.isOcupada());
   }

   public listarVagasPorTipo(tipo: TipoVeiculo): Vaga[] {
        switch (tipo) {
            case TipoVeiculo.CARRO: return this.vagasCarro;
            case TipoVeiculo.MOTO: return this.vagasMoto;
            case TipoVeiculo.CAMINHAO: return this.vagasCaminhao;
            default: return [];
        }
   }

   public listarVagas(): Vaga[] {
    return [...this.vagasCarro, ...this.vagasMoto, ...this.vagasCaminhao];
   }
   
   private getFactory(tipo: TipoVeiculo): VagaFactory | null {
       switch (tipo) {
           case TipoVeiculo.CARRO: return new VagaCarroFactory();
           case TipoVeiculo.MOTO: return new VagaMotoFactory();
           case TipoVeiculo.CAMINHAO: return new VagaCaminhaoFactory();
           default: return null;
       }
   }

   public addVaga(tipo: TipoVeiculo, numero: number): boolean {
    const vagaExistente = this.listarVagas().find(v => v.getNumero() === numero);
    if (vagaExistente) {
        return false; 
    }
    
    const factory = this.getFactory(tipo);
    if (!factory) {
        return false; 
    }

    const novaVaga = factory.criarVaga(numero);

    switch (tipo) {
      case TipoVeiculo.CARRO: this.vagasCarro.push(novaVaga); return true;
      case TipoVeiculo.MOTO: this.vagasMoto.push(novaVaga); return true;
      case TipoVeiculo.CAMINHAO: this.vagasCaminhao.push(novaVaga); return true;
      default: return false;
    }
  }

  public buscarVagaPorPlaca(placa: string): Vaga | undefined {
    return this.listarVagas().find(vaga => vaga.getVeiculoEstacionado()?.getPlaca() === placa);
  }

  // --- Métodos de Veículos ---
   public buscarVeiculoPorPlaca(placa: string): Veiculo | undefined {
        return this.veiculosEstacionados.find(v => v.getPlaca() === placa);
   }
   
   public removerVeiculoPorPlaca(placa: string): boolean {
       const index = this.veiculosEstacionados.findIndex(v => v.getPlaca() === placa);
       if (index !== -1) {
           this.veiculosEstacionados.splice(index, 1);
           return true;
       }
       return false;
   }
   
   public salvarVeiculoEstacionado(veiculo: Veiculo): void {
        this.veiculosEstacionados.push(veiculo);
   }

   public listarVeiculosEstacionados(): Veiculo[] {
       return this.veiculosEstacionados;
   }

   public salvarVeiculoCadastrado(veiculo: Veiculo): void {
    if (veiculo instanceof Carro) this.carrosDB.push(veiculo);
    else if (veiculo instanceof Moto) this.motosDB.push(veiculo);
    else if (veiculo instanceof Caminhao) this.caminhoesDB.push(veiculo);
   }

   public listarTodosCadastrados(): Veiculo[] {
    return [...this.carrosDB, ...this.motosDB, ...this.caminhoesDB];
   }

   public buscarVeiculosPorCpfCliente(cpf: string): Veiculo[] {
    return this.listarTodosCadastrados().filter(veiculo => veiculo.getCliente()?.getCpf() === cpf);
   }

   
   // --- Métodos de Clientes ---

   public salvar(item: Cliente): void {
       this.clienteDB.push(item);
   }
    
   public buscarPorId(id: string): Cliente | undefined {
       return this.clienteDB.find(cliente => cliente.getCpf() === id);
   }

   public listarTodos(): Cliente[] {
       return this.clienteDB;
   }

   public listarClientesOrdenadoPorNome(): Cliente[] {
       return [...this.clienteDB].sort((a, b) => {
           return a.getNome().localeCompare(b.getNome());
       });
    }

   public salvarCliente(cliente: Cliente): void {
       this.salvar(cliente); 
   }

   public listarClientes(): Cliente[] {
       return this.listarTodos(); 
   }

   public buscarPorCpf(cpf: string): Cliente | undefined {
       return this.buscarPorId(cpf); 
   }

   public atualizar(cpf: string, novosDados: { nome?: string; tipo?: ClientType; }): Cliente | null {
       const cliente = this.buscarPorCpf(cpf); 
       if (cliente) {
           if (novosDados.nome) cliente.setNome(novosDados.nome);
           if (novosDados.tipo) cliente.setTipo(novosDados.tipo);
           return cliente;
       }
       return null;
   }

   public excluir(cpf: string): boolean {
       const index = this.clienteDB.findIndex(cliente => cliente.getCpf() === cpf);
       if (index !== -1) {
           this.clienteDB.splice(index, 1);
           return true;
       }
       return false;
   }
}