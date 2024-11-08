CREATE TABLE IF NOT EXISTS locations (
    id SERIAL PRIMARY KEY,
    district VARCHAR(100) NOT NULL,
    sector VARCHAR(100) NOT NULL,
    cell VARCHAR(100) NOT NULL,
    village VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin', -- Possible values: 'admin', 'superadmin'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    age DATE,
    location_id INT REFERENCES locations(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date TIMESTAMP NOT NULL,
    location_id INT REFERENCES locations(id), -- Only users in this location receive the notification
    created_by INT REFERENCES admins(id),     -- Admin who created the notification
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date TIMESTAMP NOT NULL,
    location_id INT REFERENCES locations(id), -- Location-specific events
    created_by INT REFERENCES admins(id),     -- Admin who created the event
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
