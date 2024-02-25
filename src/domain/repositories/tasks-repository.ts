import {INewTaskWithUserUid, ITaskEntity} from '../entities/task.ts';

export type ITasksRepository = {
    create: (task: INewTaskWithUserUid) => ITaskEntity | null,
    update: (taskUid: string, data: any) => ITaskEntity | null,
    delete: (uid: string) => boolean,
    getAll: () => ITaskEntity[],
    getTodayTasks: () => ITaskEntity[],
    get: (uid: string) => ITaskEntity | null,
}
