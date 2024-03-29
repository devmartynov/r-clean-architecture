export type ITaskEntity = {
    uid: string,
    title: string,
    startedAt: number,
    userUid: string,
    description?: string,
    finishedAt?: number,
    projectUid?: string
}

export type INewTask = Omit<ITaskEntity, 'uid' | 'userUid'>;
export type INewTaskWithUserUid = Omit<ITaskEntity, 'uid'>;

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

export function calcTotalTime(tasks: ITaskEntity[]): number {
    return tasks.reduce((time, task) => {
        if (!task.finishedAt) {
            return time;
        }
        time += (task.finishedAt - task.startedAt) / 1000;
        return time
    }, 0);
}

export const MIN_TITLE_LENGTH = 3;
export function isTitleValid(title?: string) {
    if (!title) {
        return false;
    }
    return title.trim().length > MIN_TITLE_LENGTH;
}
