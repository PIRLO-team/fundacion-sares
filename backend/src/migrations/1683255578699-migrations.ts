import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1683255578699 implements MigrationInterface {
    name = 'migrations1683255578699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`direct_volunteer\` ADD \`observation\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`direct_volunteer\` DROP COLUMN \`observation\``);
    }

}
