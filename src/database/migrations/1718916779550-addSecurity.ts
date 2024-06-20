import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSecurity1718916779550 implements MigrationInterface {
    name = 'AddSecurity1718916779550'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sistemas" ("id" SERIAL NOT NULL, "nombre" text NOT NULL, "descripcion" text NOT NULL, "url" text NOT NULL, "activo" boolean NOT NULL DEFAULT true, "fecha_creacion" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "fecha_actualizacion" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_518b42eca8b8d3aedfd2238437b" UNIQUE ("nombre"), CONSTRAINT "PK_cb83ab0b20740002e1a499d13fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menus" ("id" SERIAL NOT NULL, "nombre" text NOT NULL, "descripcion" text NOT NULL, "activo" boolean NOT NULL DEFAULT true, "fecha_creacion" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "fecha_actualizacion" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id_sistema" integer, CONSTRAINT "UQ_a5c2df153e57edcc222370d1d4d" UNIQUE ("nombre"), CONSTRAINT "PK_3fec3d93327f4538e0cbd4349c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "submenus" ("id" SERIAL NOT NULL, "nombre" text NOT NULL, "sigla" text NOT NULL, "activo" boolean NOT NULL DEFAULT true, "base_url" text NOT NULL, "orden" integer NOT NULL, "fecha_creacion" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "fecha_actualizacion" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id_menu" integer, CONSTRAINT "UQ_91a69cb56bc0946b40bdb7b5fd5" UNIQUE ("nombre"), CONSTRAINT "PK_8e0b58b3e4e6c033ab4d45a0421" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vistas" ("id" SERIAL NOT NULL, "nombre" text NOT NULL, "pagina" text NOT NULL, "orden" integer NOT NULL, "activo" boolean NOT NULL DEFAULT true, "fecha_creacion" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "fecha_actualizacion" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id_submenu" integer, CONSTRAINT "UQ_df718b1403ba89f19ec1f7f0761" UNIQUE ("nombre"), CONSTRAINT "PK_7cc4bac7745a7c0b8e882ca9a0c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permisos" ("id_rol" integer NOT NULL, "id_vista" integer NOT NULL, CONSTRAINT "PK_011a8725c6d95f3bfa43dbcbb8d" PRIMARY KEY ("id_rol", "id_vista"))`);
        await queryRunner.query(`CREATE INDEX "IDX_534dd5ac5ef800fdcfefee6654" ON "permisos" ("id_rol") `);
        await queryRunner.query(`CREATE INDEX "IDX_4b6b3d06196052323c1ffadc45" ON "permisos" ("id_vista") `);
        await queryRunner.query(`ALTER TABLE "menus" ADD CONSTRAINT "FK_920ff2576285814e41b9968b8f6" FOREIGN KEY ("id_sistema") REFERENCES "sistemas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "submenus" ADD CONSTRAINT "FK_56b8e5b5fa364e9a7ba58622170" FOREIGN KEY ("id_menu") REFERENCES "menus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vistas" ADD CONSTRAINT "FK_ef166f75f3c929d25aeb8044abd" FOREIGN KEY ("id_submenu") REFERENCES "submenus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permisos" ADD CONSTRAINT "FK_534dd5ac5ef800fdcfefee66547" FOREIGN KEY ("id_rol") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "permisos" ADD CONSTRAINT "FK_4b6b3d06196052323c1ffadc455" FOREIGN KEY ("id_vista") REFERENCES "vistas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permisos" DROP CONSTRAINT "FK_4b6b3d06196052323c1ffadc455"`);
        await queryRunner.query(`ALTER TABLE "permisos" DROP CONSTRAINT "FK_534dd5ac5ef800fdcfefee66547"`);
        await queryRunner.query(`ALTER TABLE "vistas" DROP CONSTRAINT "FK_ef166f75f3c929d25aeb8044abd"`);
        await queryRunner.query(`ALTER TABLE "submenus" DROP CONSTRAINT "FK_56b8e5b5fa364e9a7ba58622170"`);
        await queryRunner.query(`ALTER TABLE "menus" DROP CONSTRAINT "FK_920ff2576285814e41b9968b8f6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4b6b3d06196052323c1ffadc45"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_534dd5ac5ef800fdcfefee6654"`);
        await queryRunner.query(`DROP TABLE "permisos"`);
        await queryRunner.query(`DROP TABLE "vistas"`);
        await queryRunner.query(`DROP TABLE "submenus"`);
        await queryRunner.query(`DROP TABLE "menus"`);
        await queryRunner.query(`DROP TABLE "sistemas"`);
    }

}
