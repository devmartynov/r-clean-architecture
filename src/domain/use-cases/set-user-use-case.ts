import {IUserRepository} from '@/domain/repositories/user-repository.ts';
import {IUserEntity} from '@/domain/entities/user.ts';

export default function setUserUseCase(userRepository: IUserRepository) {
    return (user: IUserEntity) => userRepository.set(user);
}
