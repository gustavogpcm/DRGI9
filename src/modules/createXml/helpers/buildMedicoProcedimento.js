"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMedicoProcedimento = void 0;
const medicoProcedimento_1 = require("../../../models/medicoProcedimento");
async function buildMedicoProcedimento(medicoProcedimentoItem) {
    const medicoProcedimento = new medicoProcedimento_1.MedicoProcedimento();
    medicoProcedimento.setUf(medicoProcedimentoItem.UF_MEDICO_PROCEDIMENTO);
    medicoProcedimento.setCrm(medicoProcedimentoItem.CRM_MEDICO_PROCEDIMENTO);
    medicoProcedimento.setTipoAtuacao(medicoProcedimentoItem.TP_ATUACAO_MEDICO_PROCEDIMENTO);
    return medicoProcedimento;
}
exports.buildMedicoProcedimento = buildMedicoProcedimento;
