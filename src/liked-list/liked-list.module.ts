import { Module } from '@nestjs/common';
import { LikedListController } from './liked-list.controller';
import { LikedListService } from './liked-list.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [LikedListController],
  providers: [LikedListService],
  exports: [LikedListService]
})
export class LikedListModule {}
