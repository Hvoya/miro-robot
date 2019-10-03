CREATE TABLE public.likes(
    id serial,
    project_id bigint,
    user_id bigint,
    created_at timestamp with time zone NOT NULL default CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES public.users(id) on delete cascade,
    FOREIGN KEY(project_id) REFERENCES public.projects(id) ON DELETE CASCADE
)