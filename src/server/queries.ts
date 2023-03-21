import HttpError from '@wasp/core/HttpError.js';
import { Context, Task, TaskType } from './serverTypes';

export const getTasks = async (args: unknown, context: Context): Promise<Task[]> => {
    return context.entities.Task.findMany({
        include: {
            type: true
        }
    });
}

export const getTypes = async (args: unknown, context: Context): Promise<TaskType[]> => {
    return context.entities.TaskType.findMany();
}

type getTaskArgs = Pick<Task, 'id'>;
export const getTaskById = async ({ id }: getTaskArgs, context: Context): Promise<Task > => {
    if (!id) {
        throw new HttpError(400, 'ID_REQUIRED', 'Id is required')
    }
    return context.entities.Task.findUniqueOrThrow({
        where: { id },
        include: {
            type: true,
        }
    });
}