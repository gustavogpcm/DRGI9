import { CronTask } from './models/cronTask'
import { executeCron } from '../modules/createXml/executeCron'

// oito da manha
const admissionCron = new CronTask(executeCron, '0 0 8 * * *')
admissionCron.start()

// Meio dia
const middayAdmission = new CronTask(executeCron, '0 0 12 * * *')
middayAdmission.start()

// 16 horas da tarde
const afternoonAdmission = new CronTask(executeCron, '0 0 16 * * *')
afternoonAdmission.start()
