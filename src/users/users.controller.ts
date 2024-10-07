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
    
    @Get()
    findAll( ){
        return this.usersService.findAll(); 
    } 
    @Get(":id")
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.usersService.findOne(id);
    }

    @Post()
    create(@Body(ValidationPipe) user: CreateUserDto) { 
        return this.usersService.create(user); 
    }

    @Patch()
    update(@Param('id') id: String, @Body() userUpdate: UpdateUserDto){
        return { id, ...userUpdate}
    }  
    // @Delete(":id")
    // delete(@Param('id') id: String){
    //     return { id }
    // }
}
