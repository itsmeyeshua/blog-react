-- Enable foreign keys | controls whether foreign key constraints are enforced | ola insertit lchi user that doesn't exist, kibda ibki 3lik
PRAGMA foreign_keys = ON;

-- Users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Blogs table
CREATE TABLE blogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    description TEXT,
    views INTEGER DEFAULT 0,
    user_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Likes table (junction table for user-blog likes)
CREATE TABLE likes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    blog_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, blog_id), -- Prevent duplicate likes
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE
);

-- Comments table
CREATE TABLE comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    blog_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE
);

-- Categories table (optional enhancement)
CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- Blog categories junction table
CREATE TABLE blog_categories (
    blog_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (blog_id, category_id),
    FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_blogs_user_id ON blogs(user_id);
CREATE INDEX idx_blogs_created_at ON blogs(created_at);
CREATE INDEX idx_likes_blog_id ON likes(blog_id);
CREATE INDEX idx_likes_user_id ON likes(user_id);
CREATE INDEX idx_comments_blog_id ON comments(blog_id);


-- Insert sample users (passwords are hashed "password123" - you should use BCrypt in your app)
INSERT INTO users (email, name, password) VALUES 
('alice@example.com', 'Alice Johnson', '$2a$10$xyz123hashedpassword1'),
('bob@example.com', 'Bob Smith', '$2a$10$xyz123hashedpassword2'),
('carol@example.com', 'Carol Davis', '$2a$10$xyz123hashedpassword3'),
('david@example.com', 'David Wilson', '$2a$10$xyz123hashedpassword4');

-- Insert sample categories
INSERT INTO categories (name) VALUES 
('Technology'),
('Travel'),
('Food'),
('Lifestyle'),
('Programming');

-- Insert sample blogs
INSERT INTO blogs (title, description, content, user_id, views) VALUES 
('Getting Started with React', 'A beginner guide to React framework', 'React is a powerful JavaScript library for building user interfaces...', 1, 150),
('My Trip to Japan', 'Amazing experiences in Tokyo and Kyoto', 'Japan was an incredible experience. The blend of traditional culture and modern technology...', 2, 89),
('Spring Boot Best Practices', 'How to build robust Spring Boot applications', 'In this post, we will explore the best practices for developing Spring Boot applications...', 1, 203),
('The Perfect Pizza Recipe', 'Making authentic Italian pizza at home', 'After years of experimentation, I finally perfected my homemade pizza recipe...', 3, 67),
('Introduction to Machine Learning', 'ML concepts for beginners', 'Machine learning is transforming how we interact with technology...', 4, 124);

-- Associate blogs with categories
INSERT INTO blog_categories (blog_id, category_id) VALUES 
(1, 5), (1, 1),  -- React blog in Programming & Technology
(2, 2),           -- Japan trip in Travel
(3, 5),           -- Spring Boot in Programming
(4, 3),           -- Pizza in Food
(5, 1), (5, 5);   -- ML in Technology & Programming

-- Insert sample likes
INSERT INTO likes (user_id, blog_id) VALUES 
(2, 1), (3, 1), (4, 1),  -- 3 likes for React blog
(1, 2), (3, 2),          -- 2 likes for Japan trip
(2, 3), (4, 3),          -- 2 likes for Spring Boot
(1, 4), (2, 4), (4, 4),  -- 3 likes for Pizza recipe
(1, 5), (2, 5), (3, 5);  -- 3 likes for ML blog

-- Insert sample comments
INSERT INTO comments (content, user_id, blog_id) VALUES 
('Great introduction! Very helpful for beginners.', 2, 1),
('Looking forward to part 2 of this series.', 3, 1),
('Tokyo is amazing! I visited last year.', 1, 2),
('These Spring Boot tips saved me so much time!', 4, 3),
('Tried this pizza recipe - it was delicious!', 2, 4),
('Can you write more about neural networks?', 3, 5);