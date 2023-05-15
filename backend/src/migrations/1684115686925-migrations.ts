import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1684115686925 implements MigrationInterface {
    name = 'migrations1684115686925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`discount_non_consumable\` (\`discount_supply_id\` bigint NOT NULL AUTO_INCREMENT, \`discount_type_id\` bigint NOT NULL, \`non_consumable_id\` varchar(255) NOT NULL, PRIMARY KEY (\`discount_supply_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`discount_non_consumable\` ADD CONSTRAINT \`FK_a7721dae416e5b6d467af5ed52a\` FOREIGN KEY (\`non_consumable_id\`) REFERENCES \`non_consumable\`(\`non_consumable_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`discount_non_consumable\` ADD CONSTRAINT \`FK_f0a741116b0880cab03ba5fa79d\` FOREIGN KEY (\`discount_type_id\`) REFERENCES \`discount_type\`(\`discount_type_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`discount_non_consumable\` DROP FOREIGN KEY \`FK_f0a741116b0880cab03ba5fa79d\``);
        await queryRunner.query(`ALTER TABLE \`discount_non_consumable\` DROP FOREIGN KEY \`FK_a7721dae416e5b6d467af5ed52a\``);
        await queryRunner.query(`DROP TABLE \`discount_non_consumable\``);
    }

}
