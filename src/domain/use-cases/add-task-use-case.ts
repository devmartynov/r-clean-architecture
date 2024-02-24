import {INewTask, tasksDoNotOverlap} from '../entities/task.ts';
import {ITasksRepository} from '../repositories/tasks-repository.ts';
import {INotifyService} from '../services/notifier-service.ts';

export default function addTaskUseCase(repository: ITasksRepository, notifyService: INotifyService) {
    return (task: INewTask) => {
        const isValidTime = repository
            .getAll()
            .every(t => tasksDoNotOverlap(t, task));

        if (!isValidTime) {
            notifyService.error('Task overlaps with another task');
            throw new Error('Task overlaps with another task');
        }

        notifyService.success('Успешно добавлена');
        return repository.create(task);
    };
}
