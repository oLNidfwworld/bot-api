import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PlatformService {  
    constructor(private readonly databaseService : DatabaseService) {}

    getAllPlatforms() {
        const platforms = this.databaseService.platform.findMany();
        return platforms;
    }
}
