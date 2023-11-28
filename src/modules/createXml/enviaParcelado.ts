import knex from '../../config/database'
import { admission } from './admissionSend'

export async function enviaPareclado() {
  const dataAtendimentoFromDatabase = await knex
    .select('*')
    .from('DATAINTEGRA.TBL_DTI_ATENDIMENTO')
    .where({ TP_STATUS: 'A' })
    .orderBy('SITUACAO_INTERNACAO', 'ASC')
  if (!dataAtendimentoFromDatabase[0]) {
    console.log('NENHUM DADO ENCONTRADO.')
    return
  }
  console.log(
    'FEZ O SELECT DE ' + dataAtendimentoFromDatabase.length + ' INTERNACOES',
  )

  let qtdSelecionada = dataAtendimentoFromDatabase.length
  if (qtdSelecionada <= 15) {
    await admission(dataAtendimentoFromDatabase)
  } else {
    while (qtdSelecionada > 0) {
      const dataAtendimentoFromDatabase = await knex
        .select('*')
        .from('DATAINTEGRA.TBL_DTI_ATENDIMENTO')
        .where({ TP_STATUS: 'A' })
        .orderBy('SITUACAO_INTERNACAO', 'ASC')
        .limit(15)

      await admission(dataAtendimentoFromDatabase)

      qtdSelecionada -= dataAtendimentoFromDatabase.length
      console.log('FALTAM ' + qtdSelecionada + ' INTERNAÇOES')
    }
  }
}
