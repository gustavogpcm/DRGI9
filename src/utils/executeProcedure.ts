import knex from '../config/database'
export async function executeProcedure() {
  await knex.raw(`BEGIN DATAINTEGRA.PRC_DTI_DIARIA(); END;`)
}
