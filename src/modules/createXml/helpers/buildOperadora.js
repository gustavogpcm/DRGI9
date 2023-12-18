"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOperadora = void 0;
const operadora_1 = require("../../../models/operadora");
async function buildOperadora(item) {
    const operadora = new operadora_1.Operadora();
    operadora.setCodigo(item.CD_OPERADORA);
    // operadora.setCodigo(343889)
    operadora.setPlano(item.PLANO_OPERADORA);
    operadora.setNumeroCarteira(item.NR_CARTEIRA);
    operadora.setDataValidade(item.DT_VALIDADE_OPERADORA);
    return operadora;
}
exports.buildOperadora = buildOperadora;
