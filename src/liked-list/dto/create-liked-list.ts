import { Prisma } from "@prisma/client";
import { IsBoolean, IsNumber } from "class-validator";


export class CreateLikedListRecordDto implements Prisma.LikedListCreateInput {
    @IsBoolean()
    isLiked: boolean; 

    @IsNumber()
    uid : number; 
    user: Prisma.UserCreateNestedOneWithoutLikedListInput;
     
    @IsNumber()
    userLiked: number;
    targetUser: Prisma.UserCreateNestedOneWithoutReceivedLikesInput;
}