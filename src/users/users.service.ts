import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly databaseService : DatabaseService) {} 
    findAll() { 
        const users = this.databaseService.user.findMany();
        return users;
    }

    findOne(id: number) {
        const user = this.databaseService.user.findUnique({
            where: {
                id
            },
            include: { 
                selectedGameOnPlatform : {
                    select : {
                        game : true,
                        platform : true
                    }
                }
            }
        })
        if (!user) throw new NotFoundException('User not found')
        return  user;
    }
    findOneByTgId(tgid: number) {
        const user = this.databaseService.user.findFirst({
            where: {
                uid: tgid
            },
            include: { 
                selectedGameOnPlatform : {
                    select : {
                        game : true,
                        platform : true
                    }
                }
            }
        })
        if (!user) throw new NotFoundException('User not found')
        return  user;
    }

    create(createUserDto: CreateUserDto) {
        return this.databaseService.user.create({
            data: createUserDto
        })
    }

    // other functions just a algoritmic implementation
}
