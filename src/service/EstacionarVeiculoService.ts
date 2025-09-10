import Veiculo from "../model/Veiculo";


export default class EstacionarVeiculoService {
  private veiculosEstacionados: Veiculo[] = [];
  private limiteVagas: number;

  constructor(limiteVagas: number = 100) {
    this.limiteVagas = limiteVagas;
  }
  
  

  

}
