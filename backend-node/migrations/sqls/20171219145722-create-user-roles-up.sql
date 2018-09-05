CREATE TABLE IF NOT EXISTS user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO user_roles (role) VALUES
('business-owner'),
('seller');
