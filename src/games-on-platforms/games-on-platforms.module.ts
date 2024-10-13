import { Module } from '@nestjs/common';
import { GamesOnPlatformsService } from './games-on-platforms.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [GamesOnPlatformsService],

})
export class GamesOnPlatformsModule {}
