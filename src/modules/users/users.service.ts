import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseServiceAbstract } from '@modules/services/base/base.abstract.service';
import { User } from './entities/user.entity';
import { UserRolesService } from '@modules/user-roles/user-roles.service';
import { UserRepositoryInterface } from './interfaces/users.interface';
import { USER_ROLE } from '@modules/user-roles/entities/user-role.entity';

@Injectable()
export class UsersService extends BaseServiceAbstract<User> {

  constructor(
    @Inject('UsersRepositoryInterface')
    private readonly users_repository: UserRepositoryInterface,
    private readonly user_roles_service: UserRolesService,
  ) {
    super(users_repository);
  }
 
	async create(create_dto: CreateUserDto): Promise<User> {
		let user_role = await this.user_roles_service.findOneByCondition({
			name: USER_ROLE.USER,
		});
		if (!user_role) {
			user_role = await this.user_roles_service.create({
				name: USER_ROLE.USER,
			});
		}
		const user = await this.users_repository.create({
			...create_dto,
			role: user_role,
		});
		return user;
	}

  // findAll() {
  //   return `This action returns all users`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
