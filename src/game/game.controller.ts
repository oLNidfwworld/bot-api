import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {

    constructor(private readonly gameService: GameService){}

    @Get() 
    getGameByPlatformName(@Query('platformName') platformName: string) {
        return this.gameService.getGameByPlatformName(platformName);
    } 
}
