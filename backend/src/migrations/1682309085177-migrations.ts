import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1682309085177 implements MigrationInterface {
    name = 'migrations1682309085177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`file\` (\`is_active\` tinyint NOT NULL DEFAULT 1, \`created_date\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`last_updated_date\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`last_updated_by\` bigint NULL, \`file_id\` bigint NOT NULL AUTO_INCREMENT, \`url\` text NULL, \`user_id\` bigint NOT NULL, PRIMARY KEY (\`file_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`file\` ADD CONSTRAINT \`FK_516f1cf15166fd07b732b4b6ab0\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`file\` DROP FOREIGN KEY \`FK_516f1cf15166fd07b732b4b6ab0\``);
        await queryRunner.query(`DROP TABLE \`file\``);
    }

}
