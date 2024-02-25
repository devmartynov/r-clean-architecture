import {calcTotalTime, INewTask, isTitleValid, MIN_TITLE_LENGTH, tasksDoNotOverlap} from '../entities/task.ts';
import {ITasksRepository} from '../repositories/tasks-repository.ts';
import {INotifyService} from '../services/notifier-service.ts';
import {IUserRepository} from '@/domain/repositories/user-repository.ts';
import {getDayTimeRestriction} from '@/domain/entities/user.ts';

export default function addTaskUseCase(
    tasksRepository: ITasksRepository,
    userRepository: IUserRepository,
    notifyService: INotifyService
) {
    return (task: INewTask) => {
        // проверяет ограничения по времени
        const user = userRepository.get();
        const dayTimeRestriction = getDayTimeRestriction(user);
        if (dayTimeRestriction !== undefined) {
            const totalTime = calcTotalTime(tasksRepository.getTodayTasks());
            if (totalTime >= dayTimeRestriction) {
                notifyService.error(`Вы затрекали больше времени, чем вам разрешено. Ваше ограничение: ${dayTimeRestriction} сек.`);
                throw new Error(`You have time restriction: ${dayTimeRestriction} seconds`);
            }
        }

        // проверяет валидный ли заголовок
        if (!isTitleValid(task.title)) {
            notifyService.error(`Минимальная длина названия должна быть больше ${MIN_TITLE_LENGTH} символов`);
            throw new Error(`Title min length is ${MIN_TITLE_LENGTH}`);
        }

        // проверяет не перекрывает ли по времени другую задачу
        const isValidTime = tasksRepository
            .getAll()
            .every(t => tasksDoNotOverlap(t, task));
        if (!isValidTime) {
            notifyService.error('Task overlaps with another task');
            throw new Error('Task overlaps with another task');
        }

        return tasksRepository.create({...task, userUid: user.uid});
    };
}
