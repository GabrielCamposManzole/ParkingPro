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
// Este dublê nos permite "fingir" se uma vaga está livre ou ocupada

class MockRepositorioVagas implements IRepositorioVagas {
    
    // Propriedades que o teste vai controlar
    public vagaLivreParaRetornar: Vaga | undefined = undefined;
    public vagaOcupadaParaRetornar: Vaga | undefined = undefined;

    // Métodos da Interface
    public buscarVagaLivre(tipo: TipoVeiculo): Vaga | undefined {
        // Se a vaga que vamos retornar for do tipo certo, a retornamos
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

    // Métodos que não usamos neste teste
    public listarVagasPorTipo(tipo: TipoVeiculo): Vaga[] { return []; }
    public addVaga(tipo: TipoVeiculo, numero: number): boolean { return true; }
    public listarVagas(): Vaga[] { return []; }
}


// --- MOCK 2: Repositório de Veículos ---
// Este dublê vai nos dizer se o serviço tentou salvar ou remover um veículo

class MockRepositorioVeiculos implements IRepositorioVeiculos {
    
    // Propriedades que o teste vai controlar
    public veiculoSalvo: Veiculo | null = null;
    public placaRemovida: string | null = null;

    // Métodos da Interface
    public salvarVeiculoEstacionado(veiculo: Veiculo): void {
        this.veiculoSalvo = veiculo; // Armazena o veículo que o serviço tentou salvar
    }

    public removerVeiculoPorPlaca(placa: string): boolean {
        this.placaRemovida = placa; // Armazena a placa que o serviço tentou remover
        return true; // Finge que a remoção foi um sucesso
    }

    // Métodos que não usamos neste teste
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

    // 'beforeEach' roda antes de CADA teste 'it()'
    // Isso garante que os testes sejam limpos e isolados
    beforeEach(() => {
        mockVagaRepo = new MockRepositorioVagas();
        mockVeiculoRepo = new MockRepositorioVeiculos();
        estacionarService = new EstacionarVeiculoService(mockVagaRepo, mockVeiculoRepo);
    });

    // --- Testes do método estacionar() ---
    
    it("deve estacionar um veículo se uma vaga estiver disponível", () => {
        // 1. ARRANGE (Organizar)
        const carro = new Carro("ABC1234", "Fusca", "Azul");
        const vagaLivre = new Vaga(1, TipoVeiculo.CARRO);
        
        // Dizemos ao mock para retornar esta vaga livre
        mockVagaRepo.vagaLivreParaRetornar = vagaLivre; 

        // 2. ACT (Agir)
        const sucesso = estacionarService.estacionar(carro);

        // 3. ASSERT (Verificar)
        expect(sucesso).toBe(true); // O método deve retornar true
        expect(vagaLivre.isOcupada()).toBe(true); // A vaga deve ser marcada como ocupada
        expect(vagaLivre.getVeiculoEstacionado()).toBe(carro); // A vaga deve conter o carro
        expect(mockVeiculoRepo.veiculoSalvo).toBe(carro); // O serviço deve ter salvo o carro
    });

    it("NÃO deve estacionar um veículo se não houver vaga disponível", () => {
        // 1. ARRANGE
        const carro = new Carro("ABC1234", "Fusca", "Azul");
        
        // Não definimos 'vagaLivreParaRetornar', então o mock retornará 'undefined'
        
        // 2. ACT
        const sucesso = estacionarService.estacionar(carro);

        // 3. ASSERT
        expect(sucesso).toBe(false); // O método deve retornar false
        expect(mockVeiculoRepo.veiculoSalvo).toBe(null); // O serviço NÃO deve salvar o carro
    });

    it("NÃO deve estacionar uma MOTO em vaga de CARRO", () => {
        // 1. ARRANGE
        const moto = new Moto("MOTO123", "Biz", "Preta");
        const vagaLivre = new Vaga(1, TipoVeiculo.CARRO); // Vaga é de CARRO
        
        mockVagaRepo.vagaLivreParaRetornar = vagaLivre;
        
        // 2. ACT
        // O mock 'buscarVagaLivre' só retorna a vaga se o TIPO bater.
        // Como o tipo (MOTO) não bate com o da vaga (CARRO), ele retornará 'undefined'.
        const sucesso = estacionarService.estacionar(moto);

        // 3. ASSERT
        expect(sucesso).toBe(false);
        expect(vagaLivre.isOcupada()).toBe(false); // A vaga NÃO deve ser ocupada
        expect(mockVeiculoRepo.veiculoSalvo).toBe(null);
    });

    // --- Testes do método remover() ---

    it("deve remover um veículo se a placa for encontrada", () => {
        // 1. ARRANGE
        const placa = "ABC1234";
        const carro = new Carro(placa, "Fusca", "Azul");
        const vagaOcupada = new Vaga(1, TipoVeiculo.CARRO);
        vagaOcupada.ocupar(carro); // A vaga está ocupada por este carro

        // Dizemos ao mock para retornar esta vaga ocupada
        mockVagaRepo.vagaOcupadaParaRetornar = vagaOcupada;

        // 2. ACT
        const sucesso = estacionarService.remover(placa);

        // 3. ASSERT
        expect(sucesso).toBe(true);
        expect(vagaOcupada.isOcupada()).toBe(false); // A vaga deve ser desocupada
        expect(vagaOcupada.getVeiculoEstacionado()).toBe(null); // A vaga deve estar vazia
        expect(mockVeiculoRepo.placaRemovida).toBe(placa); // O serviço deve ter removido a placa
    });

    it("NÃO deve remover um veículo se a placa não for encontrada", () => {
        // 1. ARRANGE
        const placa = "XXX9999";
        
        // Não definimos 'vagaOcupadaParaRetornar', então o mock retornará 'undefined'

        // 2. ACT
        const sucesso = estacionarService.remover(placa);

        // 3. ASSERT
        expect(sucesso).toBe(false);
        expect(mockVeiculoRepo.placaRemovida).toBe(null); // O serviço NÃO deve remover nada
    });

});