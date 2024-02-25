import {IUserEntity} from '@/domain/entities/user.ts';

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
    uid: '1',
    name: 'Денис',
    email: 'denis@ya.ru',
    restrictions: {
        time: 3000,
        dayTime: 4000,
    }
}
