CREATE TABLE public.usuario (
	id serial NOT NULL,
	email varchar NOT NULL,
	name varchar,
	password varchar NOT NULL,
	active boolean DEFAULT true NOT NULL,
	CONSTRAINT usuario_pk PRIMARY KEY (id)
);