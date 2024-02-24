import {generateUid} from '../domain/utils.ts';
import {IProjectsRepository} from '../domain/repositories/projects-repository.ts';
import {IProjectEntity} from '../domain/entities/project.ts';
import LocalStorageRepository from './local-storage-repository.ts';

export default class ProjectRepositoryImpl extends LocalStorageRepository implements IProjectsRepository {
    static STORAGE_KEY = 'projects';
    private readonly projects: Record<string, IProjectEntity> = this.readDataFromLocalStorage();

    constructor() {
        super(ProjectRepositoryImpl.STORAGE_KEY);
    }

    create(task: Omit<IProjectEntity, 'uid'>) {
        try {
            const uid = generateUid();
            this.projects[uid] = {
                uid,
                ...task,
            };
            this.writeDataToLocalStorage(this.projects);
            return true;
        } catch (e) {
            console.error('Error writing to localStorage', e);
            return false;
        }
    }

    delete(uid: string) {
        try {
            delete this.projects[uid];
            this.writeDataToLocalStorage(this.projects);
            return true;
        } catch (e) {
            console.error('Error writing to localStorage', e);
            return false;
        }
    }

    getAll() {
        return Object.values(this.projects)
    }
}
