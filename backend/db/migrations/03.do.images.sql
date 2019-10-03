
CREATE TABLE public.images (
   id serial NOT NULL,
   original_name character varying(250),
   type character varying(250),
   name character varying(250),
   avatar boolean,
   project_id INTEGER,
   created_at timestamp with time zone NOT NULL default CURRENT_TIMESTAMP,
   updated_at timestamp with time zone NOT NULL default CURRENT_TIMESTAMP,
   PRIMARY KEY (id),
   FOREIGN KEY (project_id) references public.projects(id) on delete cascade
) WITH (OIDS = FALSE);
