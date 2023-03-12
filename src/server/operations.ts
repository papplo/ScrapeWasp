import HttpError from '@wasp/core/HttpError.js'
import { Context, Task } from './serverTypes';

type createArgs = Pick<Task, 'description' | 'completed'>;

export const createTask = async ({ description, completed }: createArgs, context: Context) => {
    if (description === "") throw new HttpError(400, 'DESCRIPTION_REQUIRED', 'Description is required')
    return context.entities.Task.create({
        data: {
            description: description,
            completed: completed,
        }
    });
}

type updateArgs = Pick<Task, 'id' | 'completed'>;
export const updateTask = async ({ id, completed }: updateArgs, context: Context) => {
    if (!completed || !id) throw new HttpError(400, 'ID_REQUIRED', 'ID is required')
    return context.entities.Task.update({
        where: { id },
        data: {
            completed: completed,
        },
    });
}