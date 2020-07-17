import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class usersTableInit1595017469909 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log("inside users migr");

        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isUnique: true,
                    isGenerated: true,
                    generationStrategy: "increment"

                },
                {
                    name: "username",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "password",
                    type: "varchar",
                    isNullable: false
                }
            ]
        }), true);

        await queryRunner.createIndex("user", new TableIndex({
            columnNames: ["username"],
            name: "INDX_USER_username"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user", true);
    }

}
