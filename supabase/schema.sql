-- Run this in your Supabase SQL Editor

create table if not exists books (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  author      text not null,
  genre       text,
  price       numeric(10, 2),
  cover_url   text,
  description text,
  created_at  timestamptz default now()
);

-- Seed with sample data
insert into books (title, author, genre, price, description) values
  ('The Alchemist',        'Paulo Coelho',     'Fiction',     12.99, 'A shepherd boy''s journey to find treasure.'),
  ('Atomic Habits',        'James Clear',      'Self-Help',   14.99, 'Build good habits, break bad ones.'),
  ('1984',                 'George Orwell',    'Dystopian',   10.99, 'A chilling vision of a totalitarian future.'),
  ('Clean Code',           'Robert C. Martin', 'Programming', 39.99, 'A handbook of agile software craftsmanship.'),
  ('Dune',                 'Frank Herbert',    'Sci-Fi',      13.99, 'An epic tale of politics and survival on a desert planet.'),
  ('The Great Gatsby',     'F. Scott Fitzgerald', 'Classic',   9.99, 'The Jazz Age tale of wealth, love, and illusion.');
