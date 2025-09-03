import { expect, test } from 'vitest'
import request from 'supertest'
import { server } from '../app.ts'
import { faker } from '@faker-js/faker'
import { makeUser } from '../tests/factories/make-user.ts'

test('login', async () => {
  await server.ready()

  const { user, passwordBeforeHash } = await makeUser()

  const response = request(server.server)
  .post('/sessions')
  .set('Content-Type', 'application/json')
  .send({ 
    email: user.email,
    password: passwordBeforeHash,
  })

  expect((await response).status).toEqual(200)
  expect((await response).body).toEqual({
    message: 'Login realizado com sucesso!',
  })
})