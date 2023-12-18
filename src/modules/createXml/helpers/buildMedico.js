"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMedico = void 0;
const medico_1 = require("../../../models/medico");
async function buildMedico(medicalItens) {
    const medico = new medico_1.Medico();
    medico.setNome(medicalItens.NM_MEDICO);
    medico.setDdd(medicalItens.DDD_MEDICO);
    medico.setTelefone(medicalItens.NR_TELEFONE_MEDICO);
    medico.setEmail(medicalItens.EMAIL_MEDICO);
    medico.setUf(medicalItens.UF_MEDICO);
    medico.setCrm(medicalItens.CRM_MEDICO);
    medico.setEspecialidade(medicalItens.ESPECIALIDADE_MEDICO);
    medico.setMedicoResponsavel(medicalItens.MEDICO_RESPONSAVEL);
    medico.setTipoAtuacao(medicalItens.TP_ATUACAO_MEDICO);
    return medico;
}
exports.buildMedico = buildMedico;
