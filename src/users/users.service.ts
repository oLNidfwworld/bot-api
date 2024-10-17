import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common'; 
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}
  findAll() {
    const users = this.databaseService.user.findMany();
    return users;
  }

  async findOne(id: number) {
    const user = await this.databaseService.user.findUnique({
      where: {
        id,
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
        uid : tgid
      },
      data : {
        ...userUpdate
      }
    });
    return user;
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
}
