
CREATE TABLE public.users (
   id serial NOT NULL,
   email character varying(250),
   password character varying(250),
   username character varying(50),
   first_name character varying(50),
   last_name character varying(50),
   role smallint NOT NULL,
   active boolean,
   activation_token character varying(100),
   created_at timestamp with time zone NOT NULL default CURRENT_TIMESTAMP,
   updated_at timestamp with time zone NOT NULL default CURRENT_TIMESTAMP,
   PRIMARY KEY (id)
) WITH (OIDS = FALSE);

INSERT INTO public.users (email, role, active, password) VALUES ('amazing@miro.ru', 0, true, '$2b$10$VO2R14cjSbZSnnU89Hq.J.zZR.7qq034KQvHYX9Tn.bLVst1ZuGAa');