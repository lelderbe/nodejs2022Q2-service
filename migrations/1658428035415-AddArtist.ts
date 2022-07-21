import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddArtist1658428035415 implements MigrationInterface {
  name = 'AddArtist1658428035415';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "artist"`);
  }
}
