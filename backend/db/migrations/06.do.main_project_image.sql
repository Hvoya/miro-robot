ALTER TABLE public.projects 
  ADD COLUMN main_image_id INTEGER,
  ADD FOREIGN KEY(main_image_id) REFERENCES public.images(id);