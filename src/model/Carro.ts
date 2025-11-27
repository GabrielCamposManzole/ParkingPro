/* import Veiculo from './Veiculo';
import { TipoVeiculo } from './TipoVeiculo';


export default class Carro extends Veiculo {

  constructor(placa: string, modelo: string, cor: string) {
    super(placa, modelo, cor);
  }

  public getTipo(): TipoVeiculo {
    return TipoVeiculo.CARRO;
  }

  public getDescricao(): string {
    return "Carro: " + super.getDescricao() + " " + this.getTipo();
  }
  public abstract fazAlgo(): void {
  }
  public fazAlgo(n: number): void {

  }
  public fazAlgo(s: string, n: number): string {
    return s + n;
  }


} */

import Veiculo from './Veiculo';
import { TipoVeiculo } from './TipoVeiculo';

export default class Carro extends Veiculo {

  constructor(placa: string, modelo: string, cor: string) {
    super(placa, modelo, cor);
  }

  public getTipo(): TipoVeiculo {
    return TipoVeiculo.CARRO;
  }

 

  //Assinatura A: Recebe apenas um número e não retorna nada
  public fazAlgo(n: number): void;

  //Assinatura B: Recebe uma string e um número, e retorna uma string
  public fazAlgo(s: string, n: number): string;

  //A IMPLEMENTAÇÃO REAL 
  public fazAlgo(s: number | string, n?: number): void | string {
    
    // Cenário A: Se o primeiro argumento for número
    if (typeof s === 'number') {
      console.log(`Lógica A: Apenas o número ${s}`);
      return; // Retorna void
    }

    // Cenário B: Se o primeiro for string e o segundo número
    if (typeof s === 'string' && typeof n === 'number') {
      return `Lógica B: String "${s}" e número ${n}`;
    }
  }

}