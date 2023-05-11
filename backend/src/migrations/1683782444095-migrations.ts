import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1683782444095 implements MigrationInterface {
    name = 'migrations1683782444095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`supply\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`supply\` DROP COLUMN \`supply_id\``);
        await queryRunner.query(`ALTER TABLE \`supply\` ADD \`supply_id\` varchar(50) NOT NULL PRIMARY KEY`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`supply\` DROP COLUMN \`supply_id\``);
        await queryRunner.query(`ALTER TABLE \`supply\` ADD \`supply_id\` varchar(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`supply\` ADD PRIMARY KEY (\`supply_id\`)`);
    }

}
