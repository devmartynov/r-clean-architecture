import {ITasksRepository} from '../repositories/tasks-repository.ts';
import {INotifyService} from '@/domain/services/notifier-service.ts';

export default function deleteTaskUseCase(repository: ITasksRepository, notifyService: INotifyService) {
   return (taskUid: string, forceDelete?: boolean) => {
       const task = repository.get(taskUid);

       if (!task) {
           notifyService.error('Задача не найдена');
           throw new Error('Task not found');
       }

       if (!task.finishedAt && !forceDelete)  {
           notifyService.error('Задача еще не закончена. Остановите таймер');
           throw new Error('Task is not finished');
       }

       return repository.delete(taskUid);
   }
}
