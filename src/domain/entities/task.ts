export type ITaskEntity = {
    uid: string,
    title: string,
    description?: string,
    startedAt: number,
    finishedAt?: number,
    projectUid?: string
}

export type INewTask = Omit<ITaskEntity, 'uid'>;

export function tasksDoNotOverlap(task1: INewTask, task2: INewTask): boolean {
    // Проверяем, что обе задачи завершены
    if (task1.finishedAt && task2.finishedAt) {
        return task1.finishedAt < task2.startedAt || task1.startedAt > task2.finishedAt;
    }

    // Если одна из задач или обе еще не завершены, проверяем пересечение по началу задач
    return task1.startedAt > task2.startedAt
        && (!task2.finishedAt || task1.startedAt > task2.finishedAt)
        || task2.startedAt > task1.startedAt
        && (!task1.finishedAt || task2.startedAt > task1.finishedAt);
}
