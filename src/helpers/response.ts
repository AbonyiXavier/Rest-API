import { Request, Response} from "express"

interface RDMM {
  response: Response
  message: string
  data?: any
  meta?: any
}

interface RDM {
  response: Response
  message: string
  data?: any
}

interface RDME {
  response: Response
  message: string
  data?: any
  error?: any
}

interface RMF {
  response: Response
  message: string
  field: string
}

export const successfulResponse = ({ response, data, message, meta }: RDMM) => {
  return response.status(200).json({
    status: true,
    message,
    meta,
    data,
  })
}

export const createdResponse = ({ response, data, message }: RDM) => {
  return response.status(201).json({
    status: true,
    message,
    data,
  })
}

export const deletedResponse = ({ response, data, message }: RDM) => {
  return response.status(204).json({
    status: true,
    message,
    data,
  })
}

export const conflictResponse = ({ response, data, message }: RDM) => {
  return response.status(409).json({
    status: false,
    message,
    data,
  })
}

export const badRequestResponse = ({ response, data, message }: RDME) => {
  return response.status(400).json({
    status: false,
    message,
    data,
  })
}

export const unauthorizedResponse = ({ response, data, message }: RDM) => {
  return response.status(401).json({
    status: false,
    message,
    data,
  })
}

export const forbiddenResponse = ({ response, data, message }: RDM) => {
  return response.status(403).json({
    status: false,
    message,
    data,
  })
}

export const notFoundResponse = ({ response, data, message }: RDM) => {
  return response.status(404).json({
    status: false,
    message,
    data,
  })
}

export const serverErrorResponse = ({ response, data, message }: RDM) => {
  return response.status(500).json({
    status: false,
    message,
    data,
  })
}

export const validationErrorResponse = ({ response, message, field }: RMF) => {
  return response.status(500).json({
    status: false,
    message: 'validation error',
    data: [
      {
        message,
        field,
        validation: 'valid',
      },
    ],
  })
}
