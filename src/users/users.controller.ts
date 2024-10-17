import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    // @Get('interns')
    // findAllIntrens(){
    //     return []
    // }

    // findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {}
     
    @Post()
    create(@Body(ValidationPipe) user: CreateUserDto) { 
        return this.usersService.create(user); 
    } 
    
    @Get(":id")
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.usersService.findOneByTgId(id); 
    }   

    @Get()
    findAll( ){
        return this.usersService.findAll(); 
    }  
    
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() userUpdate: UpdateUserDto){
        return this.usersService.updateOneByTgId(id, userUpdate);
    }   

}
