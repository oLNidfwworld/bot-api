import { Prisma } from "@prisma/client";
import { IsEnum, isNotEmpty, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto implements Prisma.UserCreateInput{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    uid: number;

    @IsNotEmpty()
    avatar_file_id?: string;

    @IsNotEmpty() 
    description: string;
 
    // @IsNotEmpty()
    // gameName : string;
    // @IsNotEmpty()
    // platformName : string;
    
    @IsNotEmpty()
    selectedGameId : number;
    @IsNotEmpty()
    selectedPlatformId : number;
      
 
    // @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
    //     message: 'Valid role required'
    // })
    // role: 'INTERN' | 'ENGINEER' | 'ADMIN'
}