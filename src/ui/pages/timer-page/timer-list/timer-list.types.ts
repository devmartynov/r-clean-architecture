import {ITaskEntity} from '@/domain/entities/task.ts';

type TaskDateGroup = string;

export type ITimerListProps = {
    items: Record<TaskDateGroup, ITaskEntity[]>,
    onDelete: (uid: string) => void,
}
