import { expect, test } from 'vitest'
import request from 'supertest'
import { server } from '../app.ts'
import { faker } from '@faker-js/faker'
import { makeCourse } from '../tests/factories/make-course.ts'

test('get a course by id', async () => {
  await server.ready()

  const course = await makeCourse();

  const response = request(server.server)
  .get(`/courses/${course.id}`)

  expect((await response).status).toEqual(200)
  expect((await response).body).toEqual({
    course: {
      id: expect.any(String),
      title: expect.any(String),
      description: null,
    }
  })
})