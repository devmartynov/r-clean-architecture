import LocalStorageRepository from '@/data/local-storage-repository.ts';
import {IUserRepository} from '@/domain/repositories/user-repository.ts';
import {IUserEntity} from '@/domain/entities/user.ts';

export default class UserRepositoryImpl extends LocalStorageRepository implements IUserRepository {
    static STORAGE_KEY = 'user';

    constructor() {
        super(UserRepositoryImpl.STORAGE_KEY);
    }

    get(): IUserEntity {
        return this.readDataFromLocalStorage();
    }

    set(user: IUserEntity): IUserEntity | null {
        try {
            this.writeDataToLocalStorage(user);
            return user;
        } catch {
            return null;
        }
    }
}
