# Sessão 9, aula 26

## npm check

Verifica todas as dependências do projeto se estão atualizadas.

```bash
  npm-check -u
```

## Mock

Muitos casos precisamos mockar algum resultado para que o teste funcione e em alguns casos especificos precisamos fazer isto com métodos especificos de bibliotecas, o caso a seguir foi feito com o método hash do bcrypt onde precisava ser mockado um erro.

O método spyOn do jest, ele encapsula a biblioteca e fica "espionando" o método desejado, em seguida o mockImplementationOnce retorna o valor mocado.

```js
import bcrypt from 'bcrypt'

test('Should be able throw if bcrypt throws', async () => {
  const sut = makeSut()

  jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { throw new Error() })

  const promise = sut.encrypt('any_value')

  await expect(promise).rejects.toThrow()
})

```
