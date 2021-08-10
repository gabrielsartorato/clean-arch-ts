# Sessão 14, aula 1

## npm check

Verifica todas as dependências do projeto se estão atualizadas.

```bash
  npm-check -u
```

## Clean Architeture

Regras de negócio devem ficar dentro de Domain em use-cases

## Git

```bash
  # Subir a versão com tags 
  git tag -a "1.0.0" -m "1.0.0"
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
