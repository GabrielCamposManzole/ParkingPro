import Veiculo from './Veiculo';
import { TipoVeiculo } from './TipoVeiculo';

export default class Caminhao extends Veiculo {

    constructor(placa: string, modelo: string, cor: string) {
        super(placa, modelo, cor);
    }
    
    public getTipo(): TipoVeiculo {
      return TipoVeiculo.CAMINHAO;
    }

    public fazAlgo(s: any, n?: any): any {
        console.log("Caminhão não faz nada.");
    }
}