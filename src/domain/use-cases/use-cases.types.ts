import {ITaskEntity} from '@/domain/entities/task.ts';

export type IUseCases = {
    addTask: any,
    markTaskAsFinished: any,
    hasProjectTasks: any,
    deleteProject: any,
    deleteTask: any,
    getProjects: any,
    getTasks: any,
    setUser: any,
    getUser: any,
}

type IDate = string;
export type IGroupedTasks = Record<IDate, {totalTime: number, tasks: ITaskEntity[]}>
