import {IProjectEntity} from '@/domain/entities/project.ts';

export type IProjectFieldProps = {
    onClick: (project: IProjectEntity) => void,
}
