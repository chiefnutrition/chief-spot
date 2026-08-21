create table if not exists prize_entries (
  id serial primary key,
  first_name text not null,
  email text not null,
  score integer not null,
  selected_ids text not null,
  option_ids text not null,
  source text not null default 'web',
  klaviyo_synced boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists prize_entries_email_idx on prize_entries (email);
create index if not exists prize_entries_created_at_idx on prize_entries (created_at);
