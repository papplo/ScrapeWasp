import HttpError from '@wasp/core/HttpError.js'
import { requestGet } from './requests.js';
import { Context, Task } from './serverTypes';

type createArgs = Pick<Task, 'description' | 'completed' | 'typeId'>;
export const createTask = async ({ description, completed, typeId }: createArgs, context: Context) => {
    if (description === "") throw new HttpError(400, 'DESCRIPTION_REQUIRED', 'Description is required')
    return context.entities.Task.create({
        data: {
            description: description,
            completed: completed,
            typeId: typeId,
        }
    });
}

type updateArgs = Pick<Task, 'id' | 'completed' | 'description'>;
export const updateTask = async ({ id, completed, description }: updateArgs, context: Context) => {
    // if (!completed || !id) throw new HttpError(400, 'ID_REQUIRED', 'ID is required')
    return context.entities.Task.update({
        where: { id },
        data: {
            completed: completed,
            description: description,
        },
    });
}

type performTaskArgs = Pick<Task, 'id'>;
export const performTask = async ({ id }: performTaskArgs, context: Context) => {
    if (id === undefined) throw new HttpError(400, 'ID_REQUIRED', 'Id is required')

    const task = await context.entities.Task.findUnique({
        where: { id },
        include: {
            type: true
        }
    });

    if (!task || !task?.typeId) {
        throw new HttpError(404, 'TASK_NOT_FOUND', 'Task not found');
    }

    const res = requestGet({ search: task?.type?.name || 'happy' });

    return res;


}