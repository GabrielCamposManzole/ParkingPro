// src/service/EstacionarVeiculoService.test.ts
import Veiculo from "../model/Veiculo";
import Carro from "../model/Carro";
import Moto from "../model/Moto";
import Vaga from "../model/Vaga";
import { TipoVeiculo } from "../model/TipoVeiculo";
import { IRepositorioVagas } from "../Repository/insterfaces/IRepositorioVagas";
import { IRepositorioVeiculos } from "../Repository/insterfaces/IRepositorioVeiculos";
import EstacionarVeiculoService from "./EstacionarVeiculoService";

// --- MOCK 1: Repositório de Vagas ---


class MockRepositorioVagas implements IRepositorioVagas {
    
    
    public vagaLivreParaRetornar: Vaga | undefined = undefined;
    public vagaOcupadaParaRetornar: Vaga | undefined = undefined;

  
    public buscarVagaLivre(tipo: TipoVeiculo): Vaga | undefined {
        
        if (this.vagaLivreParaRetornar?.getTipoVaga() === tipo) {
            return this.vagaLivreParaRetornar;
        }
        return undefined;
    }

    public buscarVagaPorPlaca(placa: string): Vaga | undefined {
        if (this.vagaOcupadaParaRetornar?.getVeiculoEstacionado()?.getPlaca() === placa) {
            return this.vagaOcupadaParaRetornar;
        }
        return undefined;
    }

    
    public listarVagasPorTipo(tipo: TipoVeiculo): Vaga[] { return []; }
    public addVaga(tipo: TipoVeiculo, numero: number): boolean { return true; }
    public listarVagas(): Vaga[] { return []; }
}



class MockRepositorioVeiculos implements IRepositorioVeiculos {
    
    
    public veiculoSalvo: Veiculo | null = null;
    public placaRemovida: string | null = null;

    
    public salvarVeiculoEstacionado(veiculo: Veiculo): void {
        this.veiculoSalvo = veiculo; 
    }

    public removerVeiculoPorPlaca(placa: string): boolean {
        this.placaRemovida = placa; 
        return true; 
    }

  
    public buscarVeiculoPorPlaca(placa: string): Veiculo | undefined { return undefined; }
    public listarVeiculosEstacionados(): Veiculo[] { return []; }
    public salvarVeiculoCadastrado(veiculo: Veiculo): void {}
    public listarTodosCadastrados(): Veiculo[] { return []; }
    public buscarVeiculosPorCpfCliente(cpf: string): Veiculo[] { return []; }
}


// --- OS TESTES ---

describe("EstacionarVeiculoService", () => {

    let mockVagaRepo: MockRepositorioVagas;
    let mockVeiculoRepo: MockRepositorioVeiculos;
    let estacionarService: EstacionarVeiculoService;

   
    beforeEach(() => {
        mockVagaRepo = new MockRepositorioVagas();
        mockVeiculoRepo = new MockRepositorioVeiculos();
        estacionarService = new EstacionarVeiculoService(mockVagaRepo, mockVeiculoRepo);
    });

    // --- Testes do método estacionar() ---
    
    it("deve estacionar um veículo se uma vaga estiver disponível", () => {
       
        const carro = new Carro("ABC1234", "Fusca", "Azul");
        const vagaLivre = new Vaga(1, TipoVeiculo.CARRO);
        
        
        mockVagaRepo.vagaLivreParaRetornar = vagaLivre; 

     
        const sucesso = estacionarService.estacionar(carro);

        
        expect(sucesso).toBe(true); 
        expect(vagaLivre.isOcupada()).toBe(true); 
        expect(vagaLivre.getVeiculoEstacionado()).toBe(carro); 
        expect(mockVeiculoRepo.veiculoSalvo).toBe(carro); 
    });

    it("NÃO deve estacionar um veículo se não houver vaga disponível", () => {
     
        const carro = new Carro("ABC1234", "Fusca", "Azul");
        
    
        const sucesso = estacionarService.estacionar(carro);

        
        expect(sucesso).toBe(false); 
        expect(mockVeiculoRepo.veiculoSalvo).toBe(null); 
    });

    it("NÃO deve estacionar uma MOTO em vaga de CARRO", () => {
        
        const moto = new Moto("MOTO123", "Biz", "Preta");
        const vagaLivre = new Vaga(1, TipoVeiculo.CARRO); 
        
        mockVagaRepo.vagaLivreParaRetornar = vagaLivre;
        
        
        const sucesso = estacionarService.estacionar(moto);

        
        expect(sucesso).toBe(false);
        expect(vagaLivre.isOcupada()).toBe(false); 
        expect(mockVeiculoRepo.veiculoSalvo).toBe(null);
    });

    

    it("deve remover um veículo se a placa for encontrada", () => {
        
        const placa = "ABC1234";
        const carro = new Carro(placa, "Fusca", "Azul");
        const vagaOcupada = new Vaga(1, TipoVeiculo.CARRO);
        vagaOcupada.ocupar(carro); 

       
        mockVagaRepo.vagaOcupadaParaRetornar = vagaOcupada;

        
        const sucesso = estacionarService.remover(placa);

       
        expect(sucesso).toBe(true);
        expect(vagaOcupada.isOcupada()).toBe(false); 
        expect(vagaOcupada.getVeiculoEstacionado()).toBe(null); 
        expect(mockVeiculoRepo.placaRemovida).toBe(placa); 
    });

    it("NÃO deve remover um veículo se a placa não for encontrada", () => {
       
        const placa = "XXX9999";
        
        
        const sucesso = estacionarService.remover(placa);

       
        expect(sucesso).toBe(false);
        expect(mockVeiculoRepo.placaRemovida).toBe(null); 
    });

});