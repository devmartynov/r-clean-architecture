import {IUserEntity} from '@/domain/entities/user.ts';

export type IUserRepository = {
    get: () => IUserEntity,
    set: (user: IUserEntity) => IUserEntity | null,
}
