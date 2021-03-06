class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Missing para: ${paramName}`)
    this.name = 'MissingParamError'
  }
}

export {
  MissingParamError
}
