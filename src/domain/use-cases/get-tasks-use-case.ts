import {ITasksRepository} from '../repositories/tasks-repository.ts';
import {ITaskEntity} from '../entities/task.ts';

export default function getTasksUseCase(repository: ITasksRepository) {
    return () => {
        const tasks =  repository.getAll();

        const groupedTasks: Record<string, ITaskEntity[]> = {};

        tasks.forEach(task => {
            const time = task.finishedAt || task.startedAt;
            const date = new Date(time)
                .toISOString()
                .split('T')[0]; // Преобразование timestamp в дату в формате "гггг-мм-дд"
            if (!groupedTasks[date]) {
                groupedTasks[date] = [];
            }
            groupedTasks[date].push(task);

        });

        return groupedTasks;
    };
}
