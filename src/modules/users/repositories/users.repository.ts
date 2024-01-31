import { BaseRepositoryAbstract } from '@modules/repositories/base/base.abstract.repository';
import { UserRole } from '@modules/user-roles/entities/user-role.entity';
import { User } from '@modules/users/entities/user.entity';
import { UserRepositoryInterface } from '@modules/users/interfaces/users.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository
  extends BaseRepositoryAbstract<User>
  implements UserRepositoryInterface
{
  constructor(
    @InjectModel(User.name)
    private readonly users_repository: Model<User>,
  ) {
    super(users_repository);
  }

  async getUserWithRole(user_id: string): Promise<User> {
    return await this.users_repository
      .findById(user_id, '-password')
      .populate([{ path: 'role', transform: (role: UserRole) => role?.name }]);
  }
}
