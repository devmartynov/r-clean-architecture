import {INewTask, ITaskEntity} from '@/domain/entities/task.ts';
import {IProjectEntity} from '@/domain/entities/project.ts';
import {IUserEntity} from '@/domain/entities/user.ts';

export type IUseCases = {
    addTask: (task: INewTask) => ITaskEntity | null | never,
    markTaskAsFinished: (taskUid: string) => ITaskEntity | null | never,
    hasProjectTasks: (projectUid: string) => boolean,
    deleteProject: (projectUid: string, forceDelete?: boolean) => boolean,
    deleteTask: (taskUid: string, forceDelete?: boolean) => boolean,
    getProjects: () => IProjectEntity[],
    getTasks: () => IGroupedTasks,
    setUser: (user: IUserEntity) => IUserEntity | null,
    getUser: () => IUserEntity | null,
}

type IDate = string;
export type IGroupedTasks = Record<IDate, {totalTime: number, tasks: ITaskEntity[]}>
