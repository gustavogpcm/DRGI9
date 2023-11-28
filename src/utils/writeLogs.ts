import fs from 'fs'
import { makeDirectory } from './makeDirectory'

export async function writeLog(xml: string) {
  const folder = await makeDirectory()
  const now = new Date()
  const hour = String(now.getHours()).padStart(2, '0')
  const minute = String(now.getMinutes()).padStart(2, '0')
  const fileName = `${hour}-${minute}.xml`

  await fs.promises.writeFile(`${folder}${fileName}`, xml)

  console.log(`Arquivo ${fileName} foi criado em ${folder}`)
}
