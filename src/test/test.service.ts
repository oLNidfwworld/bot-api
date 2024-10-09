import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TestService {
    constructor(private readonly databaseService: DatabaseService) {}

    async testFunction(obj : Prisma.GameCreateInput) {
        const newData = await this.databaseService.game.findUnique({
            where: {
                id: 1
            }, 
        });
        const newPlatform = await this.databaseService.platform.findUnique({
            where: {
                id: 1
            }, 
        });
        
        return newData;
    }
}
