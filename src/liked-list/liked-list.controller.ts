import { Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { LikedListService } from './liked-list.service';
import { Prisma } from '@prisma/client';
import { CreateLikedListRecordDto } from './dto/create-liked-list';

@Controller('liked-list')
export class LikedListController {
    constructor ( private readonly likedListService: LikedListService) {}

    // @Get(':id')
    // getList(@Param('id', ParseIntPipe) tgid : number) {
    //     return this.likedListService.getLikedList(tgid);
    // }
    
    @Post() 
    action(@Body(ValidationPipe) data : CreateLikedListRecordDto ) {
        return this.likedListService.createRecord(data);
    }
    
}
