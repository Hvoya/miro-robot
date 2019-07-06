
CREATE TABLE public.users (
   id serial NOT NULL,
   email character varying(250),
   password character varying(250),
   username character varying(50),
   first_name character varying(50),
   last_name character varying(50),
   role smallint NOT NULL,
   created_at timestamp with time zone NOT NULL default CURRENT_TIMESTAMP,
   updated_at timestamp with time zone NOT NULL default CURRENT_TIMESTAMP,
   PRIMARY KEY (id)
) WITH (OIDS = FALSE);
