import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class GamesOnPlatformsService {
    constructor(private readonly databaseService: DatabaseService) {}

    getByGameIdPlatformId(gameId: number, platformId: number) {
        const gameOnPlatformLink = this.databaseService.gamesOnPlatforms.findFirst({
            where : {
                gameId : gameId,
                platformId : platformId
            }
        }); 
        return gameOnPlatformLink;
    }
}
