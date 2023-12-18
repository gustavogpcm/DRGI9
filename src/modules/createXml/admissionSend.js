"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admission = void 0;
const database_1 = __importDefault(require("../../config/database"));
const loteInternacao_1 = require("../../models/loteInternacao");
const buildInternacao_1 = require("./helpers/buildInternacao");
const xmlToJson_1 = require("../../utils/xmlToJson");
const makeRequest_1 = require("../../utils/makeRequest");
const writeLogs_1 = require("../../utils/writeLogs");
/** @description Admission function select every record in DB where TP_STATUS is 'A', and sends it to SOAP API. */
async function admission(dataAtendimentoFromDatabase) {
    const loteInternacao = new loteInternacao_1.LoteInternacao();
    const idsInternacao = [];
    const relacaoPkAtendimento = [];
    let contaInternacao = 0;
    let contErro = 0;
    let contSucesso = 0;
    let contaInternacaoEnviada = 0;
    for (const item of dataAtendimentoFromDatabase) {
        contaInternacao++;
        idsInternacao.push(item.CD_DTI_ATENDIMENTO);
        const internacao = await (0, buildInternacao_1.buildInternacao)(item);
        loteInternacao.addInternacao(internacao);
        relacaoPkAtendimento.push(`${item.CD_DTI_ATENDIMENTO}-${item.NR_ATENDIMENTO}`);
    }
    const xml = loteInternacao.generateXML();
    await (0, writeLogs_1.writeLog)(xml);
    try {
        const response = await (0, makeRequest_1.makeRequest)(xml);
        console.log('Fez a requisição');
        const jObj = await (0, xmlToJson_1.xmlToJson)(response.data);
        const sEnvelope = jObj['S:Envelope']?.['S:Body']?.[0];
        if (sEnvelope) {
            const ns2ImportaInternacaoResponse = sEnvelope['ns2:importaInternacaoResponse']?.[0];
            if (ns2ImportaInternacaoResponse) {
                const sBody = ns2ImportaInternacaoResponse.return;
                if (sBody) {
                    const bodyResponseJson = await (0, xmlToJson_1.xmlToJson)(sBody);
                    const internacoesArray = bodyResponseJson.logInternacao.Internacao;
                    for (let i = 0; i < internacoesArray.length; i++) {
                        contaInternacaoEnviada++;
                        const internacao = internacoesArray[i];
                        console.log(internacao);
                        const codigoAtendimento = bodyResponseJson.logInternacao.Internacao[i]
                            .numeroAtendimento?.[0];
                        const situacao = internacao?.situacao?.[0];
                        if (codigoAtendimento !== undefined && situacao !== undefined) {
                            const cd_dti_atendimento = relacaoPkAtendimento
                                .find((item) => {
                                return item.split('-')[1] === codigoAtendimento;
                            })
                                ?.split('-')[0];
                            if (cd_dti_atendimento !== undefined) {
                                console.log('O CD_DTI_ATENDIMENTO: ' +
                                    cd_dti_atendimento +
                                    ' O CODIGO DE ATENDIMENTO: ' +
                                    codigoAtendimento);
                                if (situacao === 'P') {
                                    const erro = internacao?.erro?.[0] ?? 'Erro padrão';
                                    await database_1.default
                                        .update({
                                        TP_STATUS: 'E',
                                        DS_ERRO: erro,
                                    })
                                        .from('INOVEMED.TBL_INM_ATENDIMENTO')
                                        .where('CD_DTI_ATENDIMENTO', cd_dti_atendimento);
                                    contErro++;
                                }
                                else {
                                    await database_1.default
                                        .update({ TP_STATUS: 'T' })
                                        .from('INOVEMED.TBL_INM_ATENDIMENTO')
                                        .where('CD_DTI_ATENDIMENTO', cd_dti_atendimento);
                                    contSucesso++;
                                }
                            }
                        }
                    }
                }
            }
        }
        console.log('Sucesso: ' + contSucesso);
        console.log('Erro: ' + contErro);
        console.log('Internacao Enviada: ' + contaInternacaoEnviada);
        console.log('Internação: ' + contaInternacao);
    }
    catch (error) {
        console.log(error);
        console.error('Error making SOAP request:', error.message);
    }
}
exports.admission = admission;
