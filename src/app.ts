import express, { Request, Response } from "express"
import fs from 'fs'
import path from 'path'
import drivePath from "./utils/conf"
import responses from './utils/responses'
import actions, { itemInfos } from './utils/actions'
import utilsMulter from './utils/multer'

const app = express()
app.use(express.static('frontend'))
app.use(express.json())

app.post('/api/drive/*', (request: Request, response: Response) => {
  const folderPath: string = path.join(drivePath, request.params['0'])
  const name: string = request.query.name.toString()

  if (!fs.existsSync(folderPath)) return responses.doesNotExists(response, 'folder')
  if (fs.existsSync(path.join(folderPath, name))) return responses.alreadyExists(response, 'folder')

  actions.createFolder(response, folderPath, name)
})

app.get('/api/drive/*', async (request: Request, response: Response) => {
  const foDPath: string = path.join(drivePath, request.params['0'])

  if (!fs.existsSync(foDPath)) return responses.doesNotExists(response, 'path')

  const [contentType, foDInfos] = await actions.getItemSubFolderInfos(foDPath)

  response
    .set('Content-Type', contentType)
    .status(200)
    .send(foDInfos)
})

app.put('/api/drive/*', (request: Request, response: Response) => {
  const folderPath = path.join(drivePath, request.params['0'])

  if (!fs.existsSync(folderPath)) return responses.doesNotExists(response, 'folder')

  utilsMulter.upload(request, response, (error) => {
    utilsMulter.fileCreationResponse(request, response, error)
  })
})

app.delete('/api/drive/*', (request: Request, response: Response) => {
    const folderPath: string = path.join(drivePath, request.params['0'])

    if (!fs.existsSync(folderPath)) return responses.doesNotExists(response, 'folder')

    actions.deleteFolder(response, folderPath)
})

export default app