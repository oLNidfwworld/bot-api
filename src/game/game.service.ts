import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class GameService {

    constructor(private readonly databaseService : DatabaseService) { }
    
    async getGameByPlatformName(platformName : string) { 
        
        if ( ! platformName ) throw new BadRequestException( 'Invalid platformName query param' );

        const newData = await this.databaseService.platform.findFirst({
            where: {
                name : platformName
            },
        });
        const gamesOnPlatform = await this.databaseService.gamesOnPlatforms.findMany({
            where: {
                platformId: newData.id,
            },
            include: {
                game: true
            }
        }); 
        return gamesOnPlatform.map(( el ) => el.game );
    }
}
