import {IGroupedTasks} from '@/domain/use-cases/use-cases.types.ts';
import {ITasksRepository} from '@/domain/repositories/tasks-repository.ts';
import {calcTotalTime} from '@/domain/entities/task.ts';

export default function getTasksUseCase(repository: ITasksRepository) {
    return () => {
        const tasks =  repository.getAll();

        const groupedTasks: IGroupedTasks = {};

        tasks.forEach(task => {
            const time = task.finishedAt || task.startedAt;
            const date = new Date(time)
                .toISOString()
                .split('T')[0]; // Преобразование timestamp в дату в формате "гггг-мм-дд"
            if (!groupedTasks[date]) {
                groupedTasks[date] = {totalTime: 0, tasks: []};
            }
            groupedTasks[date].tasks.push(task);
        });

        const groupedTasksWithTotalTime: IGroupedTasks = {};

        Object.entries(groupedTasks).forEach(([date, data]) => {
            groupedTasksWithTotalTime[date] = {
                totalTime: calcTotalTime(data.tasks),
                tasks,
            }
        });

        return groupedTasksWithTotalTime;
    };
}
