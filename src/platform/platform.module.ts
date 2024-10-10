import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PlatformController } from './platform.controller';
import { PlatformService } from './platform.service';

@Module({
    providers: [PlatformService],
    imports: [DatabaseModule],
    controllers: [PlatformController]
  })
export class PlatformModule {}
