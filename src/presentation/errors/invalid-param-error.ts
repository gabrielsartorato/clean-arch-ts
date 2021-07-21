class InvalidParamError extends Error {
  constructor (paramName: string) {
    super(`Invalid para: ${paramName}`)
    this.name = 'InvalidParamError'
  }
}

export {
  InvalidParamError
}
