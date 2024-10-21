import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import { LikedListService } from 'src/liked-list/liked-list.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly likedListService: LikedListService,
  ) {}

  private includeUserFields = {
    selectedGameOnPlatform: {
      select: {
        game: true,
        platform: true,
      },
    },
  };

  findAll() {
    const users = this.databaseService.user.findMany();
    return users;
  }

  async findOne(id: number) {
    const user = await this.databaseService.user.findUnique({
      where: {
        id,
      },
      include: this.includeUserFields,
    });
    if (!user) throw new NotFoundException('User not found');

    const santizied = this.sanitizeOutput(user);

    return santizied;
  }
  async findOneByTgId(tgid: number) {
    const user = await this.databaseService.user.findFirst({
      where: {
        uid: tgid,
      },
      include: {
        selectedGameOnPlatform: {
          select: {
            game: true,
            platform: true,
          },
        },
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const santizied = {
      ...user,
      game: user.selectedGameOnPlatform.game,
      platform: user.selectedGameOnPlatform.platform,
    };
    delete santizied['selectedGameOnPlatform'];

    return santizied;
  }

  async updateOneByTgId(tgid: number, userUpdate: UpdateUserDto) {
    const user = this.databaseService.user.update({
      where: {
        uid: tgid,
      },
      data: {
        ...userUpdate,
      },
    });
    return user;
  }

  async getUserBySimilarPlatformGame(tgid: number) {
    const userLikedList = await this.likedListService.getLikedListIds(tgid);
    const user = await this.findOneByTgId(tgid);
    const similarUser = await this.databaseService.user.findFirst({
      where: {
        selectedGameId: user.selectedGameId,
        selectedPlatformId: user.selectedPlatformId,
        NOT : {
          id : {
            in : [ ...userLikedList, user.id ], // TODO : not records ids, but uid
          }
        }
      },
      include: this.includeUserFields,
    }); 
    if (!similarUser) throw new NotFoundException('next user not found');

    const santizied = this.sanitizeOutput(similarUser);

    return santizied;
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.databaseService.user.create({
      data: createUserDto,
      include: {
        selectedGameOnPlatform: {
          select: {
            game: true,
            platform: true,
          },
        },
      },
    });

    const santizied = {
      ...user,
      game: user.selectedGameOnPlatform.game,
      platform: user.selectedGameOnPlatform.platform,
    };
    delete santizied['selectedGameOnPlatform'];

    return santizied;
  }

  private sanitizeOutput(user) {
    const santizied = {
      ...user,
      game: user.selectedGameOnPlatform.game,
      platform: user.selectedGameOnPlatform.platform,
    };
    delete santizied['selectedGameOnPlatform'];
    return santizied;
  }
}
