import {INewTask, ITaskEntity} from '../domain/entities/task.ts';
import {generateUid} from '../domain/utils.ts';
import {ITasksRepository} from '../domain/repositories/tasks-repository.ts';
import LocalStorageRepository from './local-storage-repository.ts';

export default class TasksRepositoryImpl extends LocalStorageRepository implements ITasksRepository {
    static STORAGE_KEY = 'tasks';
    private readonly tasks: Record<string, ITaskEntity> = this.readDataFromLocalStorage();

    constructor() {
        super(TasksRepositoryImpl.STORAGE_KEY);
    }

    create(task: INewTask) {
        try {
            const uid = generateUid();
            const newTask = {
                uid,
                ...task,
            }
            this.tasks[uid] = newTask;
            this.writeDataToLocalStorage(this.tasks);
            return newTask;
        } catch (e) {
            console.error('Error writing to localStorage', e);
            return null;
        }
    }

    delete(uid: string) {
        try {
            delete this.tasks[uid];
            this.writeDataToLocalStorage(this.tasks);
            return true;
        } catch (e) {
            console.error('Error writing to localStorage', e);
            return false;
        }
    }

    getAll() {
        return Object.values(this.tasks);
    }

    get(uid: string): ITaskEntity | null {
       return this.tasks[uid] || null;
    }

    update(taskUid: string, data: Partial<INewTask>): ITaskEntity | null {
        try {
            const task = this.get(taskUid);

            if (!task) {
                return null;
            }

            const updatedTask = {
                ...task,
                ...data,
            };

            this.tasks[taskUid] = updatedTask;
            this.writeDataToLocalStorage(this.tasks);
            return updatedTask;
        } catch (e) {
            console.error('Error writing to localStorage', e);
            return null;
        }
    }
}
