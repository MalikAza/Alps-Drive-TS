import fs from 'fs'
import path from 'path'
import responses from './responses'
import { Response } from 'express'

const alphaNumericRegEx: RegExp = new RegExp('^[a-zA-Z\-_\.0-9]+$')

export type itemInfos = {
  name: string,
  isFolder: boolean,
  size?: number
}

function _getItemInfos(currentPath: string, item: fs.Dirent): itemInfos {
  let itemInfos: itemInfos = {
    name: item.name,
    isFolder: true
  }

  if (!item.isDirectory()) {
    itemInfos.isFolder = false
    itemInfos.size = fs.statSync(path.join(currentPath, item.name)).size
  }

  return itemInfos
}

async function getFolderInfos(folderPath: string): Promise<itemInfos[]> {
  let folderInfos = []

  const items: fs.Dirent[] = fs.readdirSync(`${folderPath}`, {withFileTypes: true})
  await Promise.all(items.map((fd: fs.Dirent) => {
    return folderInfos.push(_getItemInfos(`${folderPath}`, fd))
  }))

  return folderInfos
}

async function getItemSubFolderInfos(itemPath: string): Promise<[string, itemInfos[] | string]> {
  const item: fs.Stats = fs.lstatSync(itemPath)

  if (!item.isDirectory()) return ['application/octet-stream', fs.readFileSync(itemPath, 'utf-8')]

  else return ['application/json', await getFolderInfos(itemPath)]
}

function createFolder(response: Response, currentPath: string, name: string): Response {
  if (!alphaNumericRegEx.test(name)) return responses.notAlphaNum(response)

  fs.mkdirSync(path.join(currentPath, name))
  response.status(201).json({
    "message": "Folder perfectly created."
  })
}

function deleteFolder(response: Response, currentPath: string): Response {
  fs.rmSync(path.join(currentPath), { recursive: true, force: true })
  return response.status(200).json({
    "message": "Folder perfectly deleted."
  })
}

export default {
  getFolderInfos,
  getItemSubFolderInfos,
  createFolder,
  deleteFolder
}