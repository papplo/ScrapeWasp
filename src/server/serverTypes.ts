import { Task, Prisma } from '@prisma/client';
export { Task } from '@prisma/client';

export type Context = {
    entities: {
        Task: Prisma.TaskDelegate<{}>;
    }
}