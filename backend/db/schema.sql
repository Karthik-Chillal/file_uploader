CREATE TABLE users(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL,
  password_hash VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL
);
CREATE TABLE folders(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  folder_name TEXT NOT NULL,
  user_id UUID NOT NULL,
  parent_folder_id UUID,
  date_created TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_parent_folder
    FOREIGN KEY(parent_folder_id)
    REFERENCES folders(id)
    ON DELETE CASCADE
);

CREATE TABLE files(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  original_name TEXT NOT NULL,
  folder_contained_id UUID,
  user_id UUID NOT NULL,
  file_size BIGINT NOT NULL,
  mime_type TEXT NOT NULL,
  date_created TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_file_in_folder
    FOREIGN KEY(folder_contained_id)
    REFERENCES  folders(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);