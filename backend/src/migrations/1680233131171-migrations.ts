import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1680233131171 implements MigrationInterface {
    name = 'migrations1680233131171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`role\` (\`role_id\` bigint NOT NULL AUTO_INCREMENT, \`role_name\` varchar(50) NOT NULL, \`role_description\` text NOT NULL, PRIMARY KEY (\`role_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`is_active\` tinyint NOT NULL DEFAULT 1, \`created_date\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`last_updated_date\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`last_updated_by\` bigint NULL, \`user_id\` bigint NOT NULL AUTO_INCREMENT, \`first_name\` varchar(50) NOT NULL, \`last_name\` varchar(50) NOT NULL, \`username\` varchar(50) NOT NULL, \`email\` text NOT NULL, \`password\` text NOT NULL, \`profession\` text NULL, \`document\` bigint NULL, \`code\` int NULL, \`new_user\` tinyint NULL DEFAULT 1, \`user_role\` bigint NOT NULL, PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_da280e30feaccd83853e3b8b1e5\` FOREIGN KEY (\`user_role\`) REFERENCES \`role\`(\`role_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_da280e30feaccd83853e3b8b1e5\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`role\``);
    }

}
