import { BaseRepositoryInterface } from '@modules/repositories/base/base.interface.repository';
import { User } from '@modules/users/entities/user.entity';

export interface UserRepositoryInterface extends BaseRepositoryInterface<User> {
  getUserWithRole(user_id: string): Promise<User>;
}
