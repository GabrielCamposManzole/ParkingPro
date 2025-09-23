import Veiculo from './Veiculo';


export default class Carro extends Veiculo {

  constructor(placa: string, modelo: string, cor: string) {
    super(placa, modelo, cor);
  }
  
}