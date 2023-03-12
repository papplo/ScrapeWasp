export const createTask = async (args, context) => {
    return context.entities.Task.create({
        data: {
            description: args.description,
            completed: args.completed,
       }
    });
}

export const updateTask = async (args, context) => {
    return context.entities.Task.update({
        where: { id: args.id },
        data: {
            description: args.description,
            completed: args.completed,
        },
    });
}