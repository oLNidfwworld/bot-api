import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';

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

  // other functions just a algoritmic implementation
}
