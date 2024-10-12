CREATE TABLE IF NOT EXISTS user_settings (
    user_id UUID PRIMARY KEY,
    theme TEXT,
    language TEXT,
    notifications_enabled BOOLEAN,
    model TEXT
);