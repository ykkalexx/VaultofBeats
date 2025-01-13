CREATE TABLE project_files (
                               id SERIAL PRIMARY KEY,
                               project_id INTEGER REFERENCES projects(id),
                               user_id INTEGER REFERENCES users(id),
                               file_name VARCHAR(255) NOT NULL,
                               s3_key VARCHAR(255) NOT NULL,
                               original_name VARCHAR(255) NOT NULL,
                               mime_type VARCHAR(100),
                               created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);