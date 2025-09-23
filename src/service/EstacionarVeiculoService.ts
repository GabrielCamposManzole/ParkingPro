import Veiculo from "../model/Veiculo";


export default class EstacionarVeiculoService {
  private veiculosEstacionados: Veiculo[] = [];
  private limiteVagas: number;

  constructor(limiteVagas: number = 100) {
    this.limiteVagas = limiteVagas;
  }

  public estacionarVeiculo(veiculo: Veiculo): boolean {
    if (this.veiculosEstacionados.length < this.limiteVagas) {
      this.veiculosEstacionados.push(veiculo);
      return true;
    } else {
      return false;
    }
  }

  public removerVeiculo(placa: string): boolean {
    const index = this.veiculosEstacionados.findIndex(v => v.getPlaca() === placa);
    if (index !== -1) {
      this.veiculosEstacionados.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  public listarVeiculosEstacionados(): Veiculo[] {
    return this.veiculosEstacionados;
  }

  public vagasDisponiveis(): number {
    return this.limiteVagas - this.veiculosEstacionados.length;
  }
  public getLimiteVagas(): number {
    return this.limiteVagas;
  }
  
  

  

}
