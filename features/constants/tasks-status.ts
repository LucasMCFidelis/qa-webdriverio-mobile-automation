export const tasksStatus = { 
    pending: 'pendente', 
    completed: 'concluída' 
};

export type TasksStatus = keyof typeof tasksStatus;