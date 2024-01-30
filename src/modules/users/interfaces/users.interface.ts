import { BaseRepositoryInterface } from '@modules/repositories/base/base.interface.repository';
import { User } from '@modules/users/entities/user.entity';

export type UserRepositoryInterface = BaseRepositoryInterface<User>;
