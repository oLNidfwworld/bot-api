import { Prisma } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto implements Prisma.UserCreateInput{
    @IsString()
    @IsNotEmpty()
    tg_name: string;

    @IsNotEmpty()
    tg_uid: number;

    tg_avatar?: string;

    @IsNotEmpty()
    tg_description: string;
 
    // @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
    //     message: 'Valid role required'
    // })
    // role: 'INTERN' | 'ENGINEER' | 'ADMIN'
}