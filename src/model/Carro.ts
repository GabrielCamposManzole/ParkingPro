import Veiculo from './Veiculo';
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
  public fazAlgo(n:number): void {

}
public fazAlgo(s:string, n:number): string {
  
}
}