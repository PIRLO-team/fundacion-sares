import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1683857450408 implements MigrationInterface {
    name = 'migrations1683857450408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`discount_supply\` CHANGE \`motive\` \`discount_type_id\` varchar(100) NOT NULL`);
        await queryRunner.query(`CREATE TABLE \`discount_type\` (\`discount_type_id\` bigint NOT NULL AUTO_INCREMENT, \`discount_type_name\` varchar(255) NOT NULL, PRIMARY KEY (\`discount_type_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`discount_supply\` DROP COLUMN \`discount_type_id\``);
        await queryRunner.query(`ALTER TABLE \`discount_supply\` ADD \`discount_type_id\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`discount_supply\` ADD CONSTRAINT \`FK_63ff1e5868f1b0a33a4929665f0\` FOREIGN KEY (\`discount_type_id\`) REFERENCES \`discount_type\`(\`discount_type_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`discount_supply\` DROP FOREIGN KEY \`FK_63ff1e5868f1b0a33a4929665f0\``);
        await queryRunner.query(`ALTER TABLE \`discount_supply\` DROP COLUMN \`discount_type_id\``);
        await queryRunner.query(`ALTER TABLE \`discount_supply\` ADD \`discount_type_id\` varchar(100) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`discount_type\``);
        await queryRunner.query(`ALTER TABLE \`discount_supply\` CHANGE \`discount_type_id\` \`motive\` varchar(100) NOT NULL`);
    }

}
