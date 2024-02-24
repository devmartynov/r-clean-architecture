import {IGroupedTasks} from '@/domain/use-cases/use-cases.types.ts';

export type ITimerListProps = {
    items: IGroupedTasks,
    onDelete: (uid: string) => void,
}
