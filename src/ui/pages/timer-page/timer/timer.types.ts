import {INewTask, ITaskEntity} from '@/domain/entities/task.ts';

export type ITimerProps = {
    addTask: (task: INewTask) => ITaskEntity,
    deleteTask: (uid: string, forceDelete?: boolean) => void,
    markTaskAsFinished: (uid: string) => void,
}
