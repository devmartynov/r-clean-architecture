import {IGroupedTasks} from '@/domain/use-cases/use-cases.types.ts';
import {ITasksRepository} from '@/domain/repositories/tasks-repository.ts';
import {calcTotalTime} from '@/domain/entities/task.ts';
import {convertTimeToYYYYMMDD} from '@/domain/utils.ts';

export default function getTasksUseCase(repository: ITasksRepository) {
    return () => {
        const tasks =  repository.getAll();

        const groupedTasks: IGroupedTasks = {};

        tasks.forEach(task => {
            const date = convertTimeToYYYYMMDD(task.finishedAt || task.startedAt);
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
