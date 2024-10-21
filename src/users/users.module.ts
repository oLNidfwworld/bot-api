import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/database/database.module';
import { LikedListModule } from 'src/liked-list/liked-list.module';

@Module({
  imports: [DatabaseModule, LikedListModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
