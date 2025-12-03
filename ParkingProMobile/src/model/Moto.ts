import Veiculo from './Veiculo';
import { TipoVeiculo } from './TipoVeiculo';

export default class Moto extends Veiculo {


  
  constructor(placa: string, modelo: string, cor: string) {
    super(placa, modelo, cor);
  }

  public getTipo(): TipoVeiculo {
    return TipoVeiculo.MOTO;
  }
  
  public fazAlgo(s: any, n?: any): any {
      console.log("Moto não faz nada.");

}
}