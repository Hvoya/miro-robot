
CREATE TABLE public.projects (
   id serial NOT NULL,
   views integer,
   name character varying(250),
   description character varying(2000),
   user_id integer,
   created_at timestamp with time zone NOT NULL default CURRENT_TIMESTAMP,
   updated_at timestamp with time zone NOT NULL default CURRENT_TIMESTAMP,
   PRIMARY KEY (id),
   FOREIGN KEY (user_id) references public.users(id)
) WITH (OIDS = FALSE);
