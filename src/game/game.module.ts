import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { DatabaseModule } from 'src/database/database.module';
import { GameController } from './game.controller';

@Module({
    providers : [ GameService ],
    imports : [ DatabaseModule ],
    controllers : [ GameController ]
})
export class GameModule {}
