import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema, UserSchemaFactory } from './entities/user.entity';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import {
  Collection,
  CollectionSchema,
} from '@modules/collection/entities/collection.entity';
import {
  FlashCard,
  FlashCardSchema,
} from '@modules/flash-cards/entities/flash-card.entity';
import { UsersRepository } from './repositories/users.repository';
import { UserRolesModule } from '@modules/user-roles/user-roles.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: UserSchemaFactory,
        inject: [getModelToken(FlashCard.name), getModelToken(Collection.name)],
        imports: [
          MongooseModule.forFeature([
            { name: FlashCard.name, schema: FlashCardSchema },
            { name: Collection.name, schema: CollectionSchema },
          ]),
        ],
      },
    ]),
    UserRolesModule
  ],
  controllers: [UsersController],
  providers: [UsersService, { provide: 'UsersRepositoryInterface', useClass: UsersRepository },],
})
export class UsersModule { }
