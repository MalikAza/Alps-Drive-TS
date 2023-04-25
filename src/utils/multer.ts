import { Request, Response } from "express"

import multer from 'multer'
import drivePath from './conf'

const storage = multer.diskStorage({
  destination: function(request, file, callback) {
    callback(null, request.path.replace('/api/drive', drivePath))
  },
  filename: function(request, file, callback) {
    callback(null, file.originalname)
  }
})

function fileCreationResponse(request: Request, response: Response, error: Error): Response {
  if (!request.file) return response.status(400).send('No file provided')
  if (error) return response.status(400).send('Something went wrong!')

  response.status(201).json({
    "message": "File perfectly uploaded."
  })
}

const upload = multer({
  storage: storage
}).single('file')

export default { upload, fileCreationResponse }