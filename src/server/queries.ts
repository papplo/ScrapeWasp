import { Context, Task } from './serverTypes';

export const getTasks = async (args: unknown, context: Context): Promise<Task[]> => {
    return context.entities.Task.findMany();
}