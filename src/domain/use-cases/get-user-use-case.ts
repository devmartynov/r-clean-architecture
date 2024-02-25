import {IUserRepository} from '@/domain/repositories/user-repository.ts';

export default function getUserUseCase(repository: IUserRepository) {
   return () => repository.get();
}
