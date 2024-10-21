import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { TestModule } from './test/test.module';
import { PlatformModule } from './platform/platform.module';
import { GameModule } from './game/game.module'; 
import { LikedListModule } from './liked-list/liked-list.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    TestModule,
    PlatformModule,
    GameModule, 
    LikedListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
