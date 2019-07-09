ALTER TABLE public.images
  ADD COLUMN user_id BIGINT,
  ADD FOREIGN KEY (user_id) REFERENCES public.users; 