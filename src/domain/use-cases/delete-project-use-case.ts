import {IProjectsRepository} from '../repositories/projects-repository.ts';
import {ITasksRepository} from '../repositories/tasks-repository.ts';
import hasProjectTasksUseCase from './has-project-tasks-use-case.ts';
import {INotifyService} from '@/domain/services/notifier-service.ts';

export default function deleteProjectUseCase(
    projectRepository: IProjectsRepository,
    tasksRepository: ITasksRepository,
    notifyService: INotifyService,
) {
    return (projectUid: string, forceDelete?: boolean) => {
        const hasTasks = hasProjectTasksUseCase(tasksRepository);

        if (hasTasks(projectUid) && !forceDelete) {
            notifyService.error('Есть задачи, которые прикреплены к этому проекту. Сначала открепите эти задачи или удалить их.');
            throw new Error('Project has tasks');
        }

        projectRepository.delete(projectUid);
    }
}
