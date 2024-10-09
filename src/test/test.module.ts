import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { DatabaseModule } from 'src/database/database.module';
import { TestController } from './test.controller';

@Module({
  providers: [TestService],
  imports: [DatabaseModule],
  controllers: [TestController]
})
export class TestModule {}
