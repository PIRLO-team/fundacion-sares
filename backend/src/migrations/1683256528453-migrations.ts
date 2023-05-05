import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1683256528453 implements MigrationInterface {
    name = 'migrations1683256528453'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`provider\` (\`provider_id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(45) NOT NULL, \`email\` text NOT NULL, \`nit\` bigint NOT NULL, \`other_contact\` text NULL, \`phone\` bigint NULL, PRIMARY KEY (\`provider_id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`provider\``);
    }

}
