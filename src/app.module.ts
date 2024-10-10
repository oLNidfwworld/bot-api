import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { TestController } from './test/test.controller';
import { TestModule } from './test/test.module';
import { GameService } from './game/game.service';
import { GameController } from './game/game.controller';
import { PlatformService } from './platform/platform.service';
import { PlatformController } from './platform/platform.controller';
import { PlatformModule } from './platform/platform.module';
import { GameModule } from './game/game.module';

@Module({
  imports: [UsersModule, DatabaseModule, TestModule, PlatformModule, GameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
