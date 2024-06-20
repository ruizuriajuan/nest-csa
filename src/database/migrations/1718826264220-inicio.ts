import { MigrationInterface, QueryRunner } from "typeorm";

export class Inicio1718826264220 implements MigrationInterface {
    name = 'Inicio1718826264220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "nombre" text NOT NULL, "descripcion" text NOT NULL, "activo" boolean NOT NULL DEFAULT true, "fecha_creacion" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "fecha_actualizacion" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_a5be7aa67e759e347b1c6464e10" UNIQUE ("nombre"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "email" text NOT NULL, "nombre" text, "password" text NOT NULL, "activo" boolean NOT NULL DEFAULT true, "fecha_creacion" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "fecha_actualizacion" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuario_rol" ("id_usuario" integer NOT NULL, "id_rol" integer NOT NULL, CONSTRAINT "PK_cc28ffbe77be599168e1ec8670a" PRIMARY KEY ("id_usuario", "id_rol"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6adca3617fc69b2864e67196f2" ON "usuario_rol" ("id_usuario") `);
        await queryRunner.query(`CREATE INDEX "IDX_96d2a6ecb2ad0931416610845c" ON "usuario_rol" ("id_rol") `);
        await queryRunner.query(`ALTER TABLE "usuario_rol" ADD CONSTRAINT "FK_6adca3617fc69b2864e67196f2a" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "usuario_rol" ADD CONSTRAINT "FK_96d2a6ecb2ad0931416610845cf" FOREIGN KEY ("id_rol") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario_rol" DROP CONSTRAINT "FK_96d2a6ecb2ad0931416610845cf"`);
        await queryRunner.query(`ALTER TABLE "usuario_rol" DROP CONSTRAINT "FK_6adca3617fc69b2864e67196f2a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_96d2a6ecb2ad0931416610845c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6adca3617fc69b2864e67196f2"`);
        await queryRunner.query(`DROP TABLE "usuario_rol"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
