import {ITaskEntity} from '../entities/task.ts';

export type ITasksRepository = {
    create: (task: Omit<ITaskEntity, 'uid'>) => ITaskEntity | null,
    update: (taskUid: string, data: any) => ITaskEntity | null,
    delete: (uid: string) => boolean,
    getAll: () => ITaskEntity[],
    get: (uid: string) => ITaskEntity | null,
}
