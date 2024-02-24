import {ITasksRepository} from '../repositories/tasks-repository.ts';
import {INotifyService} from '@/domain/services/notifier-service.ts';

export default function markTaskFinishedUseCase(repository: ITasksRepository, notifyService: INotifyService) {
    return (taskUid: string) => {
        const task = repository.get(taskUid);

        if (!task) {
            notifyService.error('Задача не найдена');
            throw new Error('Task not found');
        }

        if (task.finishedAt) {
            notifyService.error('Задача уже завершена');
            throw new Error('Task is already finished');
        }

        return repository.update(taskUid, {finishedAt: new Date().getTime()});
    }
}
