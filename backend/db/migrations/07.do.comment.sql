CREATE TABLE public.comments(
  id serial,
  message character varying(1000),
  user_id integer,
  project_id integer,
  PRIMARY KEY(id),
  created_at timestamp with time zone NOT NULL default CURRENT_TIMESTAMP,
  updated_at timestamp with time zone NOT NULL default CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES public.users(id) on delete cascade,
  FOREIGN KEY(project_id) REFERENCES public.projects(id) on delete cascade
);