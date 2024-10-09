import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { TestService } from './test.service';
import { Prisma } from '@prisma/client';

@Controller('test')
export class TestController {
    constructor( private readonly testService: TestService) {}
 
    @Get()
    testGet( ){
        return '';
    }

    @Post()
    test(@Body(ValidationPipe) testData : Prisma.GameCreateInput) {
        return this.testService.testFunction(testData);
    }
}
