import { expect, test } from 'vitest'
import request from 'supertest'
import { server } from '../app.ts'
import { makeCourse } from '../tests/factories/make-course.ts'
import { makeAuthenticatedUser } from '../tests/factories/make-user.ts'

test('get a course by id', async () => {
  await server.ready()

  const { token } = await makeAuthenticatedUser('student')
  const course = await makeCourse();

  const response = request(server.server)
  .get(`/courses/${course.id}`)
  .set('Authorization', token)

  expect((await response).status).toEqual(200)
  expect((await response).body).toEqual({
    course: {
      id: expect.any(String),
      title: expect.any(String),
      description: null,
    }
  })
})

test('return 404 for non existing courses', async () => {
  await server.ready()

  const { token } = await makeAuthenticatedUser('student')

  const response = request(server.server)
  .get(`/courses/e7c56fcf-d023-408e-b4ad-1fab8e256a94`)
  .set('Authorization', token)

  expect((await response).status).toEqual(404)
  
})