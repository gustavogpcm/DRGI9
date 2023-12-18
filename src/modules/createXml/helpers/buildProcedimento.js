"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildProcediemnto = void 0;
const medicoProcedimento_1 = require("../../../models/medicoProcedimento");
const procedimento_1 = require("../../../models/procedimento");
const formatDate_yyyy_mm_dd_1 = require("../../../utils/formatDate_yyyy-mm-dd");
const database_1 = __importDefault(require("../../../config/database"));
/** @description buildProcedimento is a function for buil all elements in the tag <procedimento></procedimento> for the XML. This function recebe a item for select in tbl_dti_atendimento, using the set methodos in the class Procedimento. A function return all itens with your informations.  */
async function buildProcediemnto(procedimentoItens, CD_DTI_ATENDIMENTO) {
    const procedimento = new procedimento_1.Procedimento();
    procedimento.setCodigoProcedimento(procedimentoItens.CD_PROCEDIMENTO);
    const formatedDateExecucao = (0, formatDate_yyyy_mm_dd_1.converterData)(procedimentoItens.DT_EXEC);
    procedimento.setDataExecucao(formatedDateExecucao);
    const formatedDateAutorizacao = (0, formatDate_yyyy_mm_dd_1.converterData)(procedimentoItens.DT_AUTORIZACAO);
    const formatedDataSolicitacao = (0, formatDate_yyyy_mm_dd_1.converterData)(procedimentoItens.DT_SOLIC);
    procedimento.setDataSolicitacao(formatedDataSolicitacao);
    procedimento.setDataAutorizacao(formatedDateAutorizacao);
    const formatedDataExecucaoFinal = (0, formatDate_yyyy_mm_dd_1.converterData)(procedimentoItens.DT_FIM_EXEC);
    procedimento.setDataExecucaoFinal(formatedDataExecucaoFinal);
    const CodigoCirurgia = procedimentoItens.CD_CIRURGIA_AVISO;
    const dataMedicoProcedimento = await database_1.default
        .select('CRM_MEDICO_PROCEDIMENTO', 'UF_MEDICO_PROCEDIMENTO', 'TP_ATUACAO_MEDICO_PROCEDIMENTO')
        .distinct('CD_CIRURGIA_AVISO')
        .from('INOVEMED.TBL_INM_PROCEDIMENTO')
        .where({ CD_CIRURGIA_AVISO: CodigoCirurgia, CD_DTI_ATENDIMENTO });
    for (const medicoProcedimentoItens of dataMedicoProcedimento) {
        const medicoProcedimento = new medicoProcedimento_1.MedicoProcedimento();
        medicoProcedimento.setUf(medicoProcedimentoItens.UF_MEDICO_PROCEDIMENTO);
        medicoProcedimento.setCrm(medicoProcedimentoItens.CRM_MEDICO_PROCEDIMENTO);
        medicoProcedimento.setTipoAtuacao(medicoProcedimentoItens.TP_ATUACAO_MEDICO_PROCEDIMENTO);
        procedimento.addMedicoProcedimento(medicoProcedimento);
    }
    return procedimento;
}
exports.buildProcediemnto = buildProcediemnto;
