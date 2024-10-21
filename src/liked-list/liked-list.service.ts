import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateLikedListRecordDto } from './dto/create-liked-list';

@Injectable()
export class LikedListService { 
  constructor(private readonly databaseService: DatabaseService) {}

  createRecord ( likedListRecord : CreateLikedListRecordDto ) {
    const newRecord = this.databaseService.likedList.create({
        data : {
            isLiked : likedListRecord.isLiked,
            targetUser : {
                connect : {
                    uid : likedListRecord.userLiked
                }
            },
            user : {
                connect : {
                    uid : likedListRecord.uid
                }
            }
        }
    }); 
    return newRecord;
  }

  async getLikedListIds ( tgid : number ) {
    const records = await this.databaseService.likedList.findMany({
        where : {
            user : {
                uid : tgid
            }
        },
        select : {
            userLiked : true
        },
    });
    return records.map(record => record.userLiked);
  }

 
}
