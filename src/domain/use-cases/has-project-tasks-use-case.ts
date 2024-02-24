import {ITasksRepository} from '../repositories/tasks-repository.ts';

export default function hasProjectTasksUseCase(tasksRepository: ITasksRepository) {
    return (projectUid: string) => {
        return tasksRepository.getAll().some(task => task.projectUid === projectUid);
    };
}
