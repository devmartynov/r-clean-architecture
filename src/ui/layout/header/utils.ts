import {IUserEntity} from '../../../domain/entities/user.ts';

export const pages = [
    {
        label:  'Таймер',
        to: '',
    },
    {
        label:  'Отчет',
        to: 'reports',
    },
    {
        label:  'Проекты',
        to: 'projects',
    },
];

export const mockUser: IUserEntity = {
    id: '1',
    name: 'Денис',
    email: 'denis@ya.ru',
}
