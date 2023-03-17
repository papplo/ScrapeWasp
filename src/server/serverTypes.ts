import { Task, Prisma } from '@prisma/client';
export { Task, TaskType } from '@prisma/client';

export type Context = {
    entities: {
        Task: Prisma.TaskDelegate<{}>;
        TaskType: Prisma.TaskTypeDelegate<{}>;
    }
}