/*
  # Create Application Schema
  
  1. New Tables
    - `users` - User accounts with authentication and access control
    - `user_favourites` - User's favorited AI tools
    - `tools` - AI tools catalog with categories and ratings
    - `courses` - AI courses database
    - `course_modules` - Course module details
    - `blog_categories` - Blog post categories
    - `blog_posts` - Blog content management
    - `ai_news_sources` - Curated AI news directory
    - `ai_guides` - AI guide entries
    - `password_change_requests` - Password change request tracking
    - `system_config` - System configuration settings
  
  2. Security
    - Enable RLS on user_favourites and password_change_requests tables
    - Create policies for user data access control
    - Set up proper permissions for admin and regular users
  
  3. Sample Data
    - Pre-populated AI tools, courses, blog posts, and news sources
    - Initial system configuration
*/

-- Users table (core authentication)
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NULL DEFAULT 'app20260201200132errnxcxiac_v1_user',
    name VARCHAR(255),
    surname VARCHAR(255),
    access_status VARCHAR(50) DEFAULT 'pending' CHECK (access_status IN ('pending', 'approved', 'rejected')),
    access_requested_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    approved_by BIGINT,
    approved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON COLUMN users.role IS 'role enum: app20260201200132errnxcxiac_v1_user, app20260201200132errnxcxiac_v1_admin_user';
COMMENT ON COLUMN users.name IS 'User full name';
COMMENT ON COLUMN users.surname IS 'User surname/last name';
COMMENT ON COLUMN users.access_status IS 'Access approval status: pending, approved, rejected';

CREATE INDEX IF NOT EXISTS idx_users_access_status ON users(access_status);
CREATE INDEX IF NOT EXISTS idx_users_approved_by ON users(approved_by);

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- User favourites table
CREATE TABLE IF NOT EXISTS user_favourites (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    tool_name VARCHAR(200) NOT NULL,
    tool_category VARCHAR(100) NOT NULL,
    tool_description TEXT,
    tool_url TEXT,
    tool_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, tool_name)
);

CREATE INDEX idx_user_favourites_user_id ON user_favourites(user_id);
CREATE INDEX idx_user_favourites_category ON user_favourites(tool_category);

ALTER TABLE user_favourites ENABLE ROW LEVEL SECURITY;

CREATE POLICY user_favourites_select_policy ON user_favourites
    FOR SELECT USING (user_id = uid());

CREATE POLICY user_favourites_insert_policy ON user_favourites
    FOR INSERT WITH CHECK (user_id = uid());

CREATE POLICY user_favourites_update_policy ON user_favourites
    FOR UPDATE USING (user_id = uid()) WITH CHECK (user_id = uid());

CREATE POLICY user_favourites_delete_policy ON user_favourites
    FOR DELETE USING (user_id = uid());

CREATE TRIGGER update_user_favourites_updated_at
    BEFORE UPDATE ON user_favourites
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Tools catalog table
CREATE TABLE IF NOT EXISTS tools (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    url TEXT NOT NULL,
    image_url TEXT,
    use_case TEXT,
    reviews TEXT,
    cost_info TEXT,
    rating DECIMAL(2,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(name, category)
);

CREATE INDEX idx_tools_category ON tools(category);
CREATE INDEX idx_tools_featured ON tools(featured);
CREATE INDEX idx_tools_sort_order ON tools(sort_order);
CREATE INDEX idx_tools_name ON tools(name);
CREATE INDEX idx_tools_rating ON tools(rating);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    provider VARCHAR(100) NOT NULL,
    description TEXT,
    url TEXT,
    duration VARCHAR(200),
    cost VARCHAR(100),
    certificate_available BOOLEAN DEFAULT false,
    release_date VARCHAR(100),
    course_type VARCHAR(100),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_courses_provider ON courses(provider);
CREATE INDEX idx_courses_course_type ON courses(course_type);
CREATE INDEX idx_courses_sort_order ON courses(sort_order);

-- Course modules table
CREATE TABLE IF NOT EXISTS course_modules (
    id BIGSERIAL PRIMARY KEY,
    course_id BIGINT NOT NULL,
    module_number INTEGER,
    module_title VARCHAR(500) NOT NULL,
    module_description TEXT,
    duration VARCHAR(200),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_course_modules_course_id ON course_modules(course_id);

-- Blog categories table
CREATE TABLE IF NOT EXISTS blog_categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_blog_categories_slug ON blog_categories(slug);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    category_id BIGINT,
    author_name VARCHAR(200) DEFAULT 'Admin',
    published BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    view_count BIGINT DEFAULT 0,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_blog_posts_category_id ON blog_posts(category_id);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);

-- AI News Sources table
CREATE TABLE IF NOT EXISTS ai_news_sources (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    url TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    thumbnail_url TEXT,
    category VARCHAR(100),
    badges TEXT[],
    featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ai_news_sources_category ON ai_news_sources(category);
CREATE INDEX idx_ai_news_sources_featured ON ai_news_sources(featured);
CREATE INDEX idx_ai_news_sources_sort_order ON ai_news_sources(sort_order);
CREATE INDEX idx_ai_news_sources_name ON ai_news_sources(name);

CREATE OR REPLACE FUNCTION update_ai_news_sources_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_ai_news_sources_updated_at
    BEFORE UPDATE ON ai_news_sources
    FOR EACH ROW
    EXECUTE FUNCTION update_ai_news_sources_updated_at();

-- AI Guides table
CREATE TABLE IF NOT EXISTS ai_guides (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    url TEXT NOT NULL,
    category VARCHAR(100),
    sort_order INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ai_guides_category ON ai_guides(category);
CREATE INDEX idx_ai_guides_sort_order ON ai_guides(sort_order);
CREATE INDEX idx_ai_guides_featured ON ai_guides(featured);

-- Password change requests table
CREATE TABLE IF NOT EXISTS password_change_requests (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    request_reason TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    reviewed_by BIGINT,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_password_change_requests_user_id ON password_change_requests(user_id);
CREATE INDEX idx_password_change_requests_status ON password_change_requests(status);
CREATE INDEX idx_password_change_requests_reviewed_by ON password_change_requests(reviewed_by);

ALTER TABLE password_change_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY password_change_requests_select_policy ON password_change_requests
    FOR SELECT USING (user_id = uid());

CREATE POLICY password_change_requests_insert_policy ON password_change_requests
    FOR INSERT WITH CHECK (user_id = uid());

CREATE POLICY password_change_requests_update_policy ON password_change_requests
    FOR UPDATE USING (user_id = uid() AND status = 'pending');

CREATE TRIGGER update_password_change_requests_updated_at
    BEFORE UPDATE ON password_change_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- System configuration table
CREATE TABLE IF NOT EXISTS system_config (
    id BIGSERIAL PRIMARY KEY,
    config_key VARCHAR(100) NOT NULL UNIQUE,
    config_value TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO system_config (config_key, config_value, description) 
VALUES ('admin_notification_email', 'ivincentm@gmail.com', 'Email address to receive access request notifications')
ON CONFLICT (config_key) DO NOTHING;