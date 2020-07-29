import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from "typeorm";

export class createFavoriteTable1595018380044 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log("inside users migr");

        await queryRunner.createTable(new Table({
            name: "favorite",
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
                    name: "userId", //index
                    type: "int"
                },
                {
                    name: "imgUrl",
                    type: process.env.NODE_ENV === 'production' ? "text" : "longtext",
                    isNullable: false
                }
            ]
        }), true);

        await queryRunner.createForeignKey("favorite", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            onDelete: "CASCADE"
        }));

        await queryRunner.createIndex("favorite", new TableIndex({
            columnNames: ["userId"],
            name: "INDX_FAVORITE_user_Id"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("favorite", true);
    }

}
