import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { platform } from 'os';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TestService {
    constructor(private readonly databaseService: DatabaseService) {}

}
