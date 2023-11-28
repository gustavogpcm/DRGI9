import knex from '../../config/database'
import { LoteInternacao } from '../../models/loteInternacao'
import { buildInternacao } from './helpers/buildInternacao'
import { xmlToJson } from '../../utils/xmlToJson'
import { makeRequest } from '../../utils/makeRequest'
import { writeLog } from '../../utils/writeLogs'

/** @description Admission function select every record in DB where TP_STATUS is 'A', and sends it to SOAP API. */
export async function admission(dataAtendimentoFromDatabase) {
  const loteInternacao = new LoteInternacao()
  const idsInternacao: number[] = []
  const relacaoPkAtendimento: string[] = []
  let contaInternacao = 0
  let contErro = 0
  let contSucesso = 0
  let contaInternacaoEnviada = 0

  for (const item of dataAtendimentoFromDatabase) {
    contaInternacao++
    idsInternacao.push(item.CD_DTI_ATENDIMENTO)
    const internacao = await buildInternacao(item)
    loteInternacao.addInternacao(internacao)
    relacaoPkAtendimento.push(
      `${item.CD_DTI_ATENDIMENTO}-${item.NR_ATENDIMENTO}`,
    )
  }

  const xml = loteInternacao.generateXML()

  await writeLog(xml)

  try {
    const response = await makeRequest(xml)
    console.log('Fez a requisição')
    const jObj = await xmlToJson(response.data)

    const sEnvelope = jObj['S:Envelope']?.['S:Body']?.[0]

    if (sEnvelope) {
      const ns2ImportaInternacaoResponse =
        sEnvelope['ns2:importaInternacaoResponse']?.[0]

      if (ns2ImportaInternacaoResponse) {
        const sBody = ns2ImportaInternacaoResponse.return

        if (sBody) {
          const bodyResponseJson = await xmlToJson(sBody)

          const internacoesArray = bodyResponseJson.logInternacao.Internacao

          for (let i = 0; i < internacoesArray.length; i++) {
            contaInternacaoEnviada++
            const internacao = internacoesArray[i]
            console.log(internacao)
            const codigoAtendimento =
              bodyResponseJson.logInternacao.Internacao[i]
                .numeroAtendimento?.[0]
            const situacao = internacao?.situacao?.[0]

            if (codigoAtendimento !== undefined && situacao !== undefined) {
              const cd_dti_atendimento = relacaoPkAtendimento
                .find((item) => {
                  return item.split('-')[1] === codigoAtendimento
                })
                ?.split('-')[0]

              if (cd_dti_atendimento !== undefined) {
                console.log(
                  'O CD_DTI_ATENDIMENTO: ' +
                    cd_dti_atendimento +
                    ' O CODIGO DE ATENDIMENTO: ' +
                    codigoAtendimento,
                )

                if (situacao === 'P') {
                  const erro = internacao?.erro?.[0] ?? 'Erro padrão'
                  await knex
                    .update({
                      TP_STATUS: 'E',
                      DS_ERRO: erro,
                    })
                    .from('DATAINTEGRA.TBL_DTI_ATENDIMENTO')
                    .where('CD_DTI_ATENDIMENTO', cd_dti_atendimento)
                  contErro++
                } else {
                  await knex
                    .update({ TP_STATUS: 'T' })
                    .from('DATAINTEGRA.TBL_DTI_ATENDIMENTO')
                    .where('CD_DTI_ATENDIMENTO', cd_dti_atendimento)
                  contSucesso++
                }
              }
            }
          }
        }
      }
    }

    console.log('Sucesso: ' + contSucesso)
    console.log('Erro: ' + contErro)
    console.log('Internacao Enviada: ' + contaInternacaoEnviada)
    console.log('Internação: ' + contaInternacao)
  } catch (error) {
    console.log(error)
    console.error('Error making SOAP request:', error.message)
  }
}
