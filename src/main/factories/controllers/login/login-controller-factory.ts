import { LoginController } from '../../../../presentation/controllers/login/login-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeLoginValidation } from './login-validation-factory'

import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'

const makeLoginUpController = (): Controller => {
  return makeLogControllerDecorator(new LoginController(makeDbAuthentication(), makeLoginValidation()))
}

export {
  makeLoginUpController
}
