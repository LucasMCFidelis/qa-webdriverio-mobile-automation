export const tasksLists = { 
    noDate: 'No due date', 
    completed: 'Completed' 
};

export type TasksList = (typeof tasksLists)[keyof typeof tasksLists];