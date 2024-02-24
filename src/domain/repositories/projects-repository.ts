import {IProjectEntity} from '../entities/project.ts';

export type IProjectsRepository = {
    create: (task: IProjectEntity) => boolean,
    delete: (uid: string) => boolean,
    getAll: () => IProjectEntity[],
}
