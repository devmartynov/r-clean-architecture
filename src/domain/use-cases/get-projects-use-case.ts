import {IProjectsRepository} from '../repositories/projects-repository.ts';

export default function getProjectsUseCase(repository: IProjectsRepository) {
    return () => repository.getAll();
}
