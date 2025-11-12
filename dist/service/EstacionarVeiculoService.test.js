"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Carro_1 = __importDefault(require("../model/Carro"));
const Moto_1 = __importDefault(require("../model/Moto"));
const Vaga_1 = __importDefault(require("../model/Vaga"));
const TipoVeiculo_1 = require("../model/TipoVeiculo");
const EstacionarVeiculoService_1 = __importDefault(require("./EstacionarVeiculoService"));
// --- MOCK 1: Repositório de Vagas ---
// Este dublê nos permite "fingir" se uma vaga está livre ou ocupada
class MockRepositorioVagas {
    // Propriedades que o teste vai controlar
    vagaLivreParaRetornar = undefined;
    vagaOcupadaParaRetornar = undefined;
    // Métodos da Interface
    buscarVagaLivre(tipo) {
        // Se a vaga que vamos retornar for do tipo certo, a retornamos
        if (this.vagaLivreParaRetornar?.getTipoVaga() === tipo) {
            return this.vagaLivreParaRetornar;
        }
        return undefined;
    }
    buscarVagaPorPlaca(placa) {
        if (this.vagaOcupadaParaRetornar?.getVeiculoEstacionado()?.getPlaca() === placa) {
            return this.vagaOcupadaParaRetornar;
        }
        return undefined;
    }
    // Métodos que não usamos neste teste
    listarVagasPorTipo(tipo) { return []; }
    addVaga(tipo, numero) { return true; }
    listarVagas() { return []; }
}
// --- MOCK 2: Repositório de Veículos ---
// Este dublê vai nos dizer se o serviço tentou salvar ou remover um veículo
class MockRepositorioVeiculos {
    // Propriedades que o teste vai controlar
    veiculoSalvo = null;
    placaRemovida = null;
    // Métodos da Interface
    salvarVeiculoEstacionado(veiculo) {
        this.veiculoSalvo = veiculo; // Armazena o veículo que o serviço tentou salvar
    }
    removerVeiculoPorPlaca(placa) {
        this.placaRemovida = placa; // Armazena a placa que o serviço tentou remover
        return true; // Finge que a remoção foi um sucesso
    }
    // Métodos que não usamos neste teste
    buscarVeiculoPorPlaca(placa) { return undefined; }
    listarVeiculosEstacionados() { return []; }
    salvarVeiculoCadastrado(veiculo) { }
    listarTodosCadastrados() { return []; }
    buscarVeiculosPorCpfCliente(cpf) { return []; }
}
// --- OS TESTES ---
describe("EstacionarVeiculoService", () => {
    let mockVagaRepo;
    let mockVeiculoRepo;
    let estacionarService;
    // 'beforeEach' roda antes de CADA teste 'it()'
    // Isso garante que os testes sejam limpos e isolados
    beforeEach(() => {
        mockVagaRepo = new MockRepositorioVagas();
        mockVeiculoRepo = new MockRepositorioVeiculos();
        estacionarService = new EstacionarVeiculoService_1.default(mockVagaRepo, mockVeiculoRepo);
    });
    // --- Testes do método estacionar() ---
    it("deve estacionar um veículo se uma vaga estiver disponível", () => {
        // 1. ARRANGE (Organizar)
        const carro = new Carro_1.default("ABC1234", "Fusca", "Azul");
        const vagaLivre = new Vaga_1.default(1, TipoVeiculo_1.TipoVeiculo.CARRO);
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
        const carro = new Carro_1.default("ABC1234", "Fusca", "Azul");
        // Não definimos 'vagaLivreParaRetornar', então o mock retornará 'undefined'
        // 2. ACT
        const sucesso = estacionarService.estacionar(carro);
        // 3. ASSERT
        expect(sucesso).toBe(false); // O método deve retornar false
        expect(mockVeiculoRepo.veiculoSalvo).toBe(null); // O serviço NÃO deve salvar o carro
    });
    it("NÃO deve estacionar uma MOTO em vaga de CARRO", () => {
        // 1. ARRANGE
        const moto = new Moto_1.default("MOTO123", "Biz", "Preta");
        const vagaLivre = new Vaga_1.default(1, TipoVeiculo_1.TipoVeiculo.CARRO); // Vaga é de CARRO
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
        const carro = new Carro_1.default(placa, "Fusca", "Azul");
        const vagaOcupada = new Vaga_1.default(1, TipoVeiculo_1.TipoVeiculo.CARRO);
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
