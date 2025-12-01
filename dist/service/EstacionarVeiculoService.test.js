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
class MockRepositorioVagas {
    vagaLivreParaRetornar = undefined;
    vagaOcupadaParaRetornar = undefined;
    buscarVagaLivre(tipo) {
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
    buscarVagaPorNumero(numero) {
        // Retornamos undefined apenas para satisfazer o contrato da interface,
        // já que este teste específico não está testando a busca por número.
        return undefined;
    }
    listarVagasPorTipo(tipo) { return []; }
    addVaga(tipo, numero) { return true; }
    listarVagas() { return []; }
}
class MockRepositorioVeiculos {
    veiculoSalvo = null;
    placaRemovida = null;
    salvarVeiculoEstacionado(veiculo) {
        this.veiculoSalvo = veiculo;
    }
    removerVeiculoPorPlaca(placa) {
        this.placaRemovida = placa;
        return true;
    }
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
    beforeEach(() => {
        mockVagaRepo = new MockRepositorioVagas();
        mockVeiculoRepo = new MockRepositorioVeiculos();
        estacionarService = new EstacionarVeiculoService_1.default(mockVagaRepo, mockVeiculoRepo);
    });
    // --- Testes do método estacionar() ---
    it("deve estacionar um veículo se uma vaga estiver disponível", () => {
        const carro = new Carro_1.default("ABC1234", "Fusca", "Azul");
        const vagaLivre = new Vaga_1.default(1, TipoVeiculo_1.TipoVeiculo.CARRO);
        mockVagaRepo.vagaLivreParaRetornar = vagaLivre;
        const sucesso = estacionarService.estacionar(carro);
        expect(sucesso).toBe(true);
        expect(vagaLivre.isOcupada()).toBe(true);
        expect(vagaLivre.getVeiculoEstacionado()).toBe(carro);
        expect(mockVeiculoRepo.veiculoSalvo).toBe(carro);
    });
    it("NÃO deve estacionar um veículo se não houver vaga disponível", () => {
        const carro = new Carro_1.default("ABC1234", "Fusca", "Azul");
        const sucesso = estacionarService.estacionar(carro);
        expect(sucesso).toBe(false);
        expect(mockVeiculoRepo.veiculoSalvo).toBe(null);
    });
    it("NÃO deve estacionar uma MOTO em vaga de CARRO", () => {
        const moto = new Moto_1.default("MOTO123", "Biz", "Preta");
        const vagaLivre = new Vaga_1.default(1, TipoVeiculo_1.TipoVeiculo.CARRO);
        mockVagaRepo.vagaLivreParaRetornar = vagaLivre;
        const sucesso = estacionarService.estacionar(moto);
        expect(sucesso).toBe(false);
        expect(vagaLivre.isOcupada()).toBe(false);
        expect(mockVeiculoRepo.veiculoSalvo).toBe(null);
    });
    it("deve remover um veículo se a placa for encontrada", () => {
        const placa = "ABC1234";
        const carro = new Carro_1.default(placa, "Fusca", "Azul");
        const vagaOcupada = new Vaga_1.default(1, TipoVeiculo_1.TipoVeiculo.CARRO);
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
