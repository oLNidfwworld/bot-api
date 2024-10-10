import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { TestService } from './test.service'; 

@Controller('test')
export class TestController {
    constructor( private readonly testService: TestService) {} 

    @Post()
    test() {
        return 'just test ^^'
    }
}
