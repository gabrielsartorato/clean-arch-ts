class EmailInUseError extends Error {
  constructor () {
    super('Recived e-mail is booked')
    this.name = 'EmailInUseError'
  }
}

export {
  EmailInUseError
}
