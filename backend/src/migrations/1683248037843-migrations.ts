import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1683248037843 implements MigrationInterface {
    name = 'migrations1683248037843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`other_contact\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`direct_volunteer\` ADD \`first_name\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`direct_volunteer\` ADD \`last_name\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`direct_volunteer\` ADD \`email\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`direct_volunteer\` ADD \`profession\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`direct_volunteer\` ADD \`document\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`direct_volunteer\` ADD \`phone\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`direct_volunteer\` ADD \`other_contact\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`direct_volunteer\` DROP COLUMN \`other_contact\``);
        await queryRunner.query(`ALTER TABLE \`direct_volunteer\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`direct_volunteer\` DROP COLUMN \`document\``);
        await queryRunner.query(`ALTER TABLE \`direct_volunteer\` DROP COLUMN \`profession\``);
        await queryRunner.query(`ALTER TABLE \`direct_volunteer\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`direct_volunteer\` DROP COLUMN \`last_name\``);
        await queryRunner.query(`ALTER TABLE \`direct_volunteer\` DROP COLUMN \`first_name\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`other_contact\``);
    }

}
