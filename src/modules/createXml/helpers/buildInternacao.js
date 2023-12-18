"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildInternacao = void 0;
const database_1 = __importDefault(require("../../../config/database"));
const altaAdministrativa_1 = require("../../../models/altaAdministrativa");
const condicaoAdquirida_1 = require("../../../models/condicaoAdquirida");
const internacao_1 = require("../../../models/internacao");
const partoAdequado_1 = require("../../../models/partoAdequado");
const formatDate_yyyy_mm_dd_1 = require("../../../utils/formatDate_yyyy-mm-dd");
const buildCateterVascularCentral_1 = require("./buildCateterVascularCentral");
const buildCidSecundario_1 = require("./buildCidSecundario");
const buildCti_1 = require("./buildCti");
const buildHospital_1 = require("./buildHospital");
const buildMedico_1 = require("./buildMedico");
const buildOperadora_1 = require("./buildOperadora");
const buildPaciente_1 = require("./buildPaciente");
const buildProcedimento_1 = require("./buildProcedimento");
const buildSondaVesicalDeDemora_1 = require("./buildSondaVesicalDeDemora");
const buildSuporteVentilatorioFromDatabase_1 = require("./buildSuporteVentilatorioFromDatabase");
/**
 *
 * @param item is a item of select
 * @returns every data of <internacao> tag for mount a XML.
 */
async function buildInternacao(item) {
    const internacao = new internacao_1.Internacao();
    const CD_DTI_ATENDIMENTO = item.CD_DTI_ATENDIMENTO;
    internacao.setSituacao(item.SITUACAO_INTERNACAO);
    internacao.setCaraterInternacao(item.CARATER_INTERNACAO);
    internacao.setNumeroRegistro(item.NUMEROREGISTRO);
    internacao.setNumeroAtendimento(item.NR_ATENDIMENTO);
    internacao.setNumeroAutorizacao(item.NR_AUTORIZACAO);
    // console.log('item.dataAlta' + item.DT_ALTA)
    internacao.setLeito(item.DS_LEITO);
    const formatedDate = (0, formatDate_yyyy_mm_dd_1.converterData)(item.DT_INTERNACAO);
    internacao.setDataInternacao(formatedDate);
    const formatedDateAlta = (0, formatDate_yyyy_mm_dd_1.converterData)(item.DT_ALTA);
    internacao.setDataAlta(formatedDateAlta);
    internacao.setCondicaoAlta(item.CONDICAO_ALTA);
    internacao.setCodigoCidPrincipal(item.CD_CID_PRINCIPAL);
    internacao.setDataAutorizacao(item.DT_AUTORIZACAO);
    internacao.setInternadoOutrasVezes(item.INTERNADO_OUTRAS_VEZES);
    internacao.setReiternacao(item.REITERNACAO);
    internacao.setRecaida(item.RECAIDA);
    // eslint-disable-next-line eqeqeq
    if (item.SITUACAO_INTERNACAO == 2 || item.SITUACAO_INTERNACAO == 3) {
        internacao.setAcao('COMPLEMENTAR');
    }
    else {
        internacao.setAcao('');
    }
    const hospital = await (0, buildHospital_1.buildHospital)(item);
    internacao.addHospital(hospital);
    const paciente = await (0, buildPaciente_1.buildPaciente)(item);
    if (item.CD_OPERADORA) {
        const operadora = await (0, buildOperadora_1.buildOperadora)(item);
        internacao.addOpradora(operadora);
    }
    else {
        paciente.setParticular('S');
    }
    internacao.addPaciente(paciente);
    const dataMedicoFromDatabase = await database_1.default
        .select('CD_DTI_ATENDIMENTO', 'NM_MEDICO', 'DDD_MEDICO', 'NR_TELEFONE_MEDICO', 'EMAIL_MEDICO', 'UF_MEDICO', 'CRM_MEDICO', 'ESPECIALIDADE_MEDICO', 'MEDICO_RESPONSAVEL', 'TP_ATUACAO_MEDICO')
        .distinct('CRM_MEDICO')
        .from('INOVEMED.TBL_INM_MEDICO')
        .where({ CD_DTI_ATENDIMENTO });
    for (const medicalItens of dataMedicoFromDatabase) {
        const medico = await (0, buildMedico_1.buildMedico)(medicalItens);
        internacao.addMedico(medico);
    }
    const dataCidFromDatabase = await database_1.default
        .select('CD_CID')
        .from('INOVEMED.TBL_INM_CID_SEC')
        .where({ CD_DTI_ATENDIMENTO });
    for (const cidItens of dataCidFromDatabase) {
        const cidSecundario = await (0, buildCidSecundario_1.buildCidSecundario)(cidItens);
        internacao.addCidSecundario(cidSecundario);
    }
    const dataProcedimentoFromDatabase = await database_1.default
        .select('CD_PROCEDIMENTO', 'DT_EXEC', 'DT_SOLIC', 'DT_FIM_EXEC', 'CD_CIRURGIA_AVISO')
        .distinct('CD_CIRURGIA_AVISO')
        .from('INOVEMED.TBL_INM_PROCEDIMENTO')
        .where({ CD_DTI_ATENDIMENTO });
    for (const procedimentoItens of dataProcedimentoFromDatabase) {
        const procedimento = await (0, buildProcedimento_1.buildProcediemnto)(procedimentoItens, CD_DTI_ATENDIMENTO);
        internacao.addProcedimento(procedimento);
    }
    const dataCtiFromDatabase = await database_1.default
        .select('DT_INICIAL_CTI', 'DT_FINAL_CTI', 'CD_CID_PRINCIPAL', 'CONDICAO_ALTA_CTI', 'UF_CTI', 'CRM_CTI', 'NM_HOSPITAL', 'CD_HOSPITAL', 'DS_LEITO', 'TIPO')
        .from('INOVEMED.TBL_INM_CTI')
        .where({ CD_DTI_ATENDIMENTO });
    for (const ctiItens of dataCtiFromDatabase) {
        const cti = await (0, buildCti_1.buildCti)(ctiItens);
        internacao.addCti(cti);
    }
    const dataSuporteVentilatorioFromDatabase = await database_1.default
        .select('CD_DTI_ATENDIMENTO', 'DT_INICIAL_SUP_VENTILATORIO', 'DT_FINAL_SUP_VENTILATORIO')
        .from('INOVEMED.TBL_INM_SUPORTEVENTILATORIO')
        .where({ CD_DTI_ATENDIMENTO });
    for (const suporteVentilatorioItem of dataSuporteVentilatorioFromDatabase) {
        const suporteVentilatorio = await (0, buildSuporteVentilatorioFromDatabase_1.buildSuporteVentilatorioFromDatabase)(suporteVentilatorioItem);
        internacao.addSuporteVentilatorio(suporteVentilatorio);
    }
    const condicaoAdquirida = new condicaoAdquirida_1.CondicaoAdquirida();
    condicaoAdquirida.setCodigoCondicaoAdquirida(item.CD_CONDICAO_ADQUIRIDA);
    condicaoAdquirida.setDataOcorrencia(item.DT_OCORRENCIA_SUP);
    internacao.addCondicaoAdquirida(condicaoAdquirida);
    const altaAdministrativa = new altaAdministrativa_1.AltaAdministrativa();
    altaAdministrativa.setNumeroAtendimento(item.NR_ATEND_ALTA_ADM);
    altaAdministrativa.setNumeroAutorizacao(item.NR_AUTORIZACAO_ALTA_ADM);
    internacao.addAltaAdministrativa(altaAdministrativa);
    const partoAdequado = new partoAdequado_1.PartoAdequado();
    partoAdequado.setMedicacaoInducaoParto(item.MEDICACAO_INDUCAO_PARTO);
    partoAdequado.setCesariana(item.CESARIANA_PARTO_ADEQUADO);
    partoAdequado.setNumeroPartosAnteriores(item.NR_PARTOS_ANTERIORES);
    internacao.addPartoAdequado(partoAdequado);
    const dataSondaVesicalDeDemoraFromDatabase = await database_1.default
        .select('*')
        .from('INOVEMED.TBL_INM_SONDAVESICALDEDEMORA')
        .where({ CD_DTI_ATENDIMENTO });
    for (const itemSonda of dataSondaVesicalDeDemoraFromDatabase) {
        const sondaVesicalDeDemora = await (0, buildSondaVesicalDeDemora_1.buildSondaVesicalDeDemora)(itemSonda);
        internacao.addSondaVesicalDeDemora(sondaVesicalDeDemora);
    }
    const dataCateterVascularCentralFromDatabase = await database_1.default
        .select('*')
        .from('INOVEMED.TBL_INM_CATETERVASCULARCENTRAL')
        .where({ CD_DTI_ATENDIMENTO });
    for (const itemCateter of dataCateterVascularCentralFromDatabase) {
        const cateterVascularCentral = await (0, buildCateterVascularCentral_1.buildCateterVascularCentral)(itemCateter);
        internacao.addCateterVascularCentral(cateterVascularCentral);
    }
    return internacao;
}
exports.buildInternacao = buildInternacao;
