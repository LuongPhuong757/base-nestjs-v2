// import { BaseRepositoryInterface } from '@repositories/base/base.interface.repository';
import { BaseRepositoryInterface } from '@modules/repositories/base/base.interface.repository';
import { UserRole } from '../entities/user-role.entity';

export type UserRolesRepositoryInterface = BaseRepositoryInterface<UserRole>;
