import knex from '../config/database'
export async function executeProcedure() {
  await knex.raw(`BEGIN INOVEMED.prc_INM_alta_medica(); END;`)
}
