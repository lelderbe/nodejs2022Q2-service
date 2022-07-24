import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddExtensions1658420459631 implements MigrationInterface {
  name = 'AddExtensions1658420459631';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP EXTENSION IF EXISTS uuid-ossp`);
  }
}
