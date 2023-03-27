import HttpError from '@wasp/core/HttpError.js'
import { requestGet } from './requests.js'
import { Context, Task } from './serverTypes'

type createArgs = Pick<Task, 'description' | 'name' | 'query' | 'completed' | 'typeId'>
export const createTask = async ({ query, name, description, completed, typeId }: createArgs, context: Context) => {
  if (query === '') throw new HttpError(400, 'QUERY_REQUIRED', 'query is required')
  if (typeId === null) throw new HttpError(400, 'TYPEID_REQUIRED', 'type id is required');

  return context.entities.Task.create({
    data: {
      query: query,
      name: name,
      description: description,
      completed: completed,
      type: {
        connect: {
          id: typeId
        }
      }

    },
  })
}

type updateArgs = Pick<Task, 'id' | 'completed' | 'description'>
export const updateTask = async (
  { id, completed, description }: updateArgs,
  context: Context,
) => {
  // if (!id) throw new HttpError(400, 'ID_REQUIRED', 'ID is required')
  return context.entities.Task.update({
    where: { id },
    data: {
      completed: completed,
      description: description,
    },
  })
}

type performTaskArgs = Pick<Task, 'id'>
export const performTask = async ({ id }: performTaskArgs, context: Context) => {
  if (id === undefined) {
    throw new HttpError(400, 'ID_REQUIRED', 'Id is required')
  }

  const task = await context.entities.Task.findUnique({
    where: { id },
    include: {
      type: true,
    },
  })

  if (!task || !task?.typeId) {
    throw new HttpError(404, 'TASK_NOT_FOUND', 'Task not found')
  }

  const taskType = await context.entities.TaskType.findUnique({
    where: { id: task.typeId },
    include: {
      configuration: true,
    },
  })

  if (!taskType?.configuration) {
    throw new HttpError(
      404,
      'TASK_TYPE_CONFIGURATION_NOT_FOUND',
      'Task type configuration not found',
    )
  }

  const { baseHref, searchPath } = taskType.configuration
  const res = await requestGet(baseHref, searchPath, task.query)

  return await context.entities.Task.update({
    where: { id },
    data: {
      completed: true,
      runAt: new Date(),
      runCount: task.runCount + 1,
      results: {
        createMany: {
          data: res.map(r => ({
            ...r,
            rawDom: 'not implemented yet',
          })),
          skipDuplicates: true,
        },
      },
    },
    include: {
      results: true,
    },
  })
}
