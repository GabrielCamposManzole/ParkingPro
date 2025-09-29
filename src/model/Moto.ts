import Veiculo from './Veiculo';
import { TipoVeiculo } from './TipoVeiculo';

export default class Moto extends Veiculo {

  

  constructor(placa: string, modelo: string, cor: string) {
    super(placa, modelo, cor);
  }

  public getTipo(): TipoVeiculo {
    return TipoVeiculo.MOTO;
  }
  

}