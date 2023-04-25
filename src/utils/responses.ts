import { Response } from "express";

function doesNotExists(response: Response, type: string): Response {
  return response.status(404).json({
    "message": `This ${type} does not exists.`
  })
}

function alreadyExists(response: Response, type: string): Response {
  return response.status(400).send(
    `This ${type} already exists.`
  )
}

function notAlphaNum(response: Response): Response {
  return response.status(400).send(
    "The folder's name is not valid. It must be alpha-numeric."
  )
}

export default { doesNotExists, alreadyExists, notAlphaNum }