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