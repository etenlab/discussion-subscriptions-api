import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { PostgresService } from './postgres.service';

@Injectable()
export class DatabaseVersionControlService {
  constructor(private pg: PostgresService) {
    console.log('upserting graph procedures');
    this.upsert_procedures();
  }

  async upsert_procedures() {
    await this.runSqlFile('./src/core/sql/discussion_procedures.sql');
  }

  async runSqlFile(path: string) {
    console.log('loading SQL:', path);
    const data = readFileSync(path, 'utf8');
    await this.pg.pool.query(data, []);
  }
}
