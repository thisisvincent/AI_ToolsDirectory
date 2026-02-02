
-- User favourites table to store favorited tools
CREATE TABLE user_favourites (
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

-- Create index for better query performance
CREATE INDEX idx_user_favourites_user_id ON user_favourites(user_id);
CREATE INDEX idx_user_favourites_category ON user_favourites(tool_category);

-- Enable Row Level Security
ALTER TABLE user_favourites ENABLE ROW LEVEL SECURITY;

-- RLS policies for user_favourites table
CREATE POLICY user_favourites_select_policy ON user_favourites
    FOR SELECT USING (user_id = uid());

CREATE POLICY user_favourites_insert_policy ON user_favourites
    FOR INSERT WITH CHECK (user_id = uid());

CREATE POLICY user_favourites_update_policy ON user_favourites
    FOR UPDATE USING (user_id = uid()) WITH CHECK (user_id = uid());

CREATE POLICY user_favourites_delete_policy ON user_favourites
    FOR DELETE USING (user_id = uid());

-- Add trigger to automatically update updated_at timestamp
CREATE TRIGGER update_user_favourites_updated_at
    BEFORE UPDATE ON user_favourites
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add new columns to users table to support admin user management
ALTER TABLE users ADD COLUMN IF NOT EXISTS name VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS access_status VARCHAR(50) DEFAULT 'pending' CHECK (access_status IN ('pending', 'approved', 'rejected'));
ALTER TABLE users ADD COLUMN IF NOT EXISTS access_requested_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE users ADD COLUMN IF NOT EXISTS approved_by BIGINT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS approved_at TIMESTAMP WITH TIME ZONE;

-- Add comments to explain the new fields
COMMENT ON COLUMN users.name IS 'User full name';
COMMENT ON COLUMN users.access_status IS 'Access approval status: pending, approved, rejected';
COMMENT ON COLUMN users.access_requested_at IS 'Timestamp when user requested access';
COMMENT ON COLUMN users.approved_by IS 'User ID of admin who approved access';
COMMENT ON COLUMN users.approved_at IS 'Timestamp when access was approved';

-- Create index for access_status to improve query performance
CREATE INDEX IF NOT EXISTS idx_users_access_status ON users(access_status);
CREATE INDEX IF NOT EXISTS idx_users_approved_by ON users(approved_by);

-- Update existing admin user to have approved status
UPDATE users SET 
    name = 'System Administrator',
    access_status = 'approved',
    approved_at = CURRENT_TIMESTAMP
WHERE email = 'admin@aitools.com';

-- Update admin@aitools.com to have admin role
UPDATE users 
SET role = 'app20251014225423lezgriizlf_v1_admin_user',
    access_status = 'approved',
    approved_at = CURRENT_TIMESTAMP
WHERE email = 'admin@aitools.com';

-- Tools catalog table (site-wide shared, no RLS needed)
CREATE TABLE tools (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    url TEXT NOT NULL,
    image_url TEXT,
    featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(name, category)
);

-- Create indexes for better query performance
CREATE INDEX idx_tools_category ON tools(category);
CREATE INDEX idx_tools_featured ON tools(featured);
CREATE INDEX idx_tools_sort_order ON tools(sort_order);

-- Insert the tools from the screenshot
INSERT INTO tools (name, category, description, url, image_url) VALUES
('Dora.run', 'Video Creation & Editing Tools & Animation', 'AI, ship 3D animated sites with zero code', 'https://www.dora.run', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400'),
('Floya ai', 'Video Creation & Editing Tools & Animation', 'Video Generator', 'https://www.floya.ai', 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400'),
('Ideogram.ai', 'Video Creation & Editing Tools & Animation', 'product images animations', 'https://www.ideogram.ai', 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400'),
('Longcat', 'Video Creation & Editing Tools & Animation', 'Generate Minutes-Long Videos with AI', 'https://longcat-video.com/', 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=400'),
('magi-1.ai', 'Video Creation & Editing Tools & Animation', 'MAGI-1: Create Stunning AI Videos with Full Control. Turn one image into an endless video. MAGI-1 lets you control every second with unmatched quality and open-source freedom.', 'https://magi-1.ai', 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400'),
('Medeo.app', 'Video Creation & Editing Tools & Animation', 'AI Video Editor', 'https://medeo.app', 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400'),
('React bits', 'Video Creation & Editing Tools & Animation', 'Highly customizable animated components that make your React projects truly stand out', 'https://reactbits.dev/', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400'),
('Storytribeapp.com', 'Video Creation & Editing Tools & Animation', 'Free online storyboard maker', 'https://storytribeapp.com', 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400'),
('Wan', 'Video Creation & Editing Tools & Animation', 'Video Generator', 'https://wan.video', 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=400');

-- Add Nordy.ai and OpenRouter to the Multimodal(MML) Tools category
INSERT INTO tools (name, category, description, url, image_url, featured, sort_order) VALUES
('Nordy.ai', 'Multimodal(MML) Tools (Image, Text & Audio)', 'Use Prompt to generate your own image or video', 'https://nordy.ai/login', 'https://cdn.chat2db-ai.com/app/avatar/custom/32a85336-96d5-4c23-ba6c-a92426a86101_709507.png', false, 0),
('OpenRouter', 'Multimodal(MML) Tools (Image, Text & Audio)', 'One stop platform for LLM', 'https://openrouter.ai/', 'https://cdn.chat2db-ai.com/app/avatar/custom/32a85336-96d5-4c23-ba6c-a92426a86101_709507.png', false, 0);

-- Insert Studyfetch.com into the tools table under Course Generators | Authoring Tools category
INSERT INTO tools (name, category, description, url, image_url, featured, sort_order) VALUES
('Studyfetch.com', 'Course Generators | Authoring Tools', 'Create tutoring sessions, explainers, flash cards, tests and quizzes, from your course material in seconds.', 'https://www.studyfetch.com', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop', false, 0);

-- Insert Monica.im tool into the tools table
INSERT INTO tools (name, category, description, url, image_url, featured, sort_order) 
VALUES (
    'Monica.im',
    'All In One Tool For One Sub',
    'All-in-one AI assistant',
    'https://monica.im/',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop',
    false,
    0
);

-- Update category name from "Google" to "Google Ecosystem"
UPDATE tools 
SET category = 'Google Ecosystem', 
    updated_at = CURRENT_TIMESTAMP
WHERE category = 'Google';

-- Delete specific tools that are no longer needed
DELETE FROM tools 
WHERE name IN ('Google Flow', 'Google Whisk', 'Google Gemini') 
AND category = 'Google Ecosystem';

-- Add Gemini tool
INSERT INTO tools (name, category, description, url, sort_order)
VALUES 
('Gemini', 'Google Ecosystem', 'AI assistant with tools including Deep Research, Create images, Canvas, Guided Learning, Dynamic view, Labs, and Gems in Gemini. Build AI apps with NotebookLM.', 'https://gemini.google.com/app', 1);

-- Add Google AI Studio
INSERT INTO tools (name, category, description, url, sort_order)
VALUES 
('Google AI Studio', 'Google Ecosystem', 'Our most intelligent model with SOTA reasoning and multimodal understanding, and powerful agentic and vibe coding capabilities. Includes Gemini 3 Pro Preview, Nano Banana Pro (state-of-the-art image generation and editing model), and Gemini 3 Flash Preview (intelligent model built for speed, combining frontier intelligence with superior search and grounding).', 'https://aistudio.google.com/', 2);

-- Add Google Labs Experiments
INSERT INTO tools (name, category, description, url, sort_order)
VALUES 
('Google Labs Experiments', 'Google Ecosystem', 'Tools to Create, Develop, Explore, Learn, Play. More than 50 Tools including NotebookLM, Firebase and many experimental AI tools.', 'https://labs.google/experiments', 3);

-- Add Google Labs Apps
INSERT INTO tools (name, category, description, url, sort_order)
VALUES 
('Google Labs Apps', 'Google Ecosystem', 'Collection of experimental AI tools including Flow, ImageFX, MusicFX DJ, MusicFX, and Whisk for creative exploration.', 'https://labs.google/fx/tools/', 4);

-- Add Firebase
INSERT INTO tools (name, category, description, url, sort_order)
VALUES 
('Firebase', 'Google Ecosystem', 'Google''s platform for building and scaling apps with backend services, databases, and hosting solutions.', 'https://firebase.google.com/', 5);

-- Add Gemini for Education
INSERT INTO tools (name, category, description, url, sort_order)
VALUES 
('Gemini for Education', 'Google Ecosystem', 'New Gemini tools for students and educators including Mixboard, LearnYourWay, and Pomelli to enhance learning experiences.', 'https://edu.google.com/ai/gemini-for-education/', 6);

-- Create courses table to store AI course information
CREATE TABLE courses (
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

-- Create course modules table to store module details
CREATE TABLE course_modules (
    id BIGSERIAL PRIMARY KEY,
    course_id BIGINT NOT NULL,
    module_number INTEGER,
    module_title VARCHAR(500) NOT NULL,
    module_description TEXT,
    duration VARCHAR(200),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_courses_provider ON courses(provider);
CREATE INDEX idx_courses_course_type ON courses(course_type);
CREATE INDEX idx_courses_sort_order ON courses(sort_order);
CREATE INDEX idx_course_modules_course_id ON course_modules(course_id);

-- Insert IBM courses
INSERT INTO courses (title, provider, description, url, duration, certificate_available, course_type, sort_order) VALUES
('Introduction to Artificial Intelligence', 'IBM', 'Module 1: Introduction and Applications of AI (3 hours to complete), Module 2: AI Concepts, Terminology, and Application (2 hours to complete), Module 3: Business and Career Transformation (3 hours to complete), Module 4: Issues, Concerns, and Ethical Considerations (3 hours to complete)', 'https://www.coursera.org/learn/introduction-to-ai', '11 hours', true, 'Certificate Course', 1),
('Artificial Intelligence Fundamentals', 'IBM', 'Introduction to Artificial Intelligence, Natural Language Processing and Computer Vision, Machine Learning and Deep Learning, Run AI Models with IBM Watson Studio, AI Ethics, Your Future in AI: The Job Landscape', 'https://skills.yourlearning.ibm.com/', 'Not specified', true, 'Certificate Course', 2),
('IBM RAG (Retrieval-Augmented Generation) and Agentic AI Professional Certificate', 'IBM', 'Course 1: Develop Generative AI Applications: Get Started (8 hours), Course 2: Build RAG Applications: Get Started (6 hours), Course 3: Vector Databases for RAG: An Introduction (9 hours), Course 4: Advanced RAG with Vector Databases and Retrievers (7 hours), Course 5: Build Multimodal Generative AI Applications (7 hours), Course 6: Fundamentals of Building AI Agents (11 hours), Course 7: Agentic AI with LangChain and LangGraph (10 hours), Course 8: Agentic AI with LangGraph, CrewAI, AutoGen and BeeAI (12 hours). Duration: 8 weeks to complete', 'https://www.coursera.org/professional-certificates/ibm-rag-and-agentic-ai', '8 weeks', true, 'Certificate Course', 3),
('IBM AI Foundations for Everyone', 'IBM', 'Covers AI basics, ethics, and hands-on labs with Watson Studio. Certificate included. Course 1: Introduction to Artificial Intelligence (12 hours), Course 2: Generative AI: Introduction and Applications (8 hours), Course 3: Generative AI: Prompt Engineering Basics (9 hours), Course 4: Building AI Powered Chatbots Without Programming (14 hours). 4 weeks to complete', 'https://www.coursera.org/specializations/ai-foundations-for-everyone', '4 weeks', true, 'Certificate Course', 4);

-- Insert Google courses
INSERT INTO courses (title, provider, description, url, duration, certificate_available, course_type, sort_order) VALUES
('Introduction to Generative AI', 'Google', 'Module 1: Introduction to Generative AI (1 hour to complete)', 'https://www.coursera.org/learn/introduction-to-generative-ai', '1 hour', true, 'Certificate Course', 5),
('Introduction to AI', 'Google', 'Module 1: Welcome to the exciting world of AI (24 minutes to complete), Module 2: Discover how AI works (16 minutes to complete), Module 3: AI for professionals (20 minutes to complete), Module 4: Review: Introduction to AI (15 minutes to complete)', 'https://www.coursera.org/learn/google-introduction-to-ai', '75 minutes', true, 'Certificate Course', 6),
('Google AI Essentials Specialization', 'Google', 'Course 1: Introduction to AI (1 hour), Course 2: Maximize Productivity With AI Tools (1 hour), Course 3: Discover the Art of Prompting (1 hour), Course 4: Use AI Responsibly (56 minutes), Course 5: Stay Ahead of the AI Curve (1 hour)', 'https://www.coursera.org/specializations/ai-essentials-google', '5 hours', true, 'Certificate Course', 7),
('Introduction to Generative AI', 'Google', 'This is an introductory level microlearning course aimed at explaining what Generative AI is, how it is used, and how it differs from traditional machine learning methods. It also covers Google Tools to help you develop your own Gen AI apps. Lesson: Introduction to Generative AI (22 minutes), Lesson: Introduction to Generative AI: Reading (30 minutes), Check: Introduction to Generative AL: Quiz (22 minutes)', 'https://www.skills.google/course_templates/536', '74 minutes', true, 'Certificate Course', 8),
('Introduction to image generation', 'Google', 'Module 1: Introduction to image generation (19 minutes)', 'https://www.coursera.org/learn/introduction-to-image-generation', '19 minutes', true, 'Certificate Course', 9),
('Generative AI Leader', 'Google', 'For leaders; $99(AU$148) exam fee for certificate. Gen AI: Beyond the Chatbot (1 hour 30 minutes), Gen AI: Unlock Foundational Concepts (1 hour 30 minutes), Gen AI: Navigate the Landscape (1 hour 15 minutes), Gen AI Apps: Transform Your Work (1 hour 45 minutes), Gen AI Agents: Transform Your Organization (2 hours 15 minutes)', 'https://www.skills.google/paths/1951', '8 hours 15 minutes', true, 'Certificate Course', 10),
('Generative AI Fundamentals with Google Cloud', 'Google', '1-hour course on generative AI vs. traditional ML. Shareable certificate. L1 Introduction to Generative AI with Google Cloud, L2 Introduction to Large Language Models with Google Cloud, L3 Introduction to Responsible AI with Google Cloud, L4 Generative AI Fundamentals Quiz', 'https://www.udacity.com/course/generative-ai-fundamentals-for-google-cloud--cd13291', '1 hour', true, 'Certificate Course', 11);

-- Insert Microsoft courses
INSERT INTO courses (title, provider, description, url, duration, certificate_available, course_type, sort_order) VALUES
('Career Essentials in Generative AI', 'Microsoft/LinkedIn', 'Focuses on Copilot and business applications. Certificate free with LinkedIn Premium. What Is Generative AI? (Released Mar 15, 2023), Your Top AI Questions Answered: AI Literacy for... (Released Aug 1, 2025), Learning Microsoft 365 Copilot for Work (Released Aug 26, 2025), Using Generative AI Ethically at Work (Released Jan 23, 2025), Everyday AI Concepts (Released Nov 5, 2024)', 'https://www.linkedin.com/learning/paths/career-essentials-in-generative-ai-by-microsoft-and-linkedin', '5 hours', true, 'Certificate Course', 12);

-- Insert other provider courses
INSERT INTO courses (title, provider, description, url, duration, certificate_available, course_type, sort_order) VALUES
('Fundamentals of Machine Learning and Artificial Intelligence', 'AWS', 'Module 1: Fundamentals of Machine Learning and AI (1 hour to complete)', 'https://www.coursera.org/learn/fundamentals-of-machine-learning-and-artificial-intelligence', '1 hour', true, 'Certificate Course', 13),
('Introduction to Artificial Intelligence', 'University of Illinois Urbana-Champaign', 'Module 1: History and Overview of AI (5 hours to complete), Module 2: Machine Learning Basics (4 hours to complete), Module 3: Deep Learning and Gene (4 hours to complete), Module 4: The Future of AI (6 hours to complete)', 'https://www.coursera.org/learn/intro-to-artificial-intelligence', '19 hours', true, 'Certificate Course', 14),
('Elements of AI', 'University of Helsinki', 'Beginner-friendly course. Certificate free.', 'https://www.elementsofai.com/', 'Not specified', true, 'Certificate Course', 15),
('Generative AI Fundamentals', 'Databricks', 'Delivery format: 4 videos. Duration not specified', 'https://www.databricks.com/resources/learn/training/generative-ai-fundamentals', 'Not specified', false, 'Certificate Course', 16);

-- Insert course modules for detailed courses
INSERT INTO course_modules (course_id, module_number, module_title, duration) VALUES
(1, 1, 'Introduction and Applications of AI', '3 hours'),
(1, 2, 'AI Concepts, Terminology, and Application', '2 hours'),
(1, 3, 'Business and Career Transformation', '3 hours'),
(1, 4, 'Issues, Concerns, and Ethical Considerations', '3 hours'),
(3, 1, 'Develop Generative AI Applications: Get Started', '8 hours'),
(3, 2, 'Build RAG Applications: Get Started', '6 hours'),
(3, 3, 'Vector Databases for RAG: An Introduction', '9 hours'),
(3, 4, 'Advanced RAG with Vector Databases and Retrievers', '7 hours'),
(3, 5, 'Build Multimodal Generative AI Applications', '7 hours'),
(3, 6, 'Fundamentals of Building AI Agents', '11 hours'),
(3, 7, 'Agentic AI with LangChain and LangGraph', '10 hours'),
(3, 8, 'Agentic AI with LangGraph, CrewAI, AutoGen and BeeAI', '12 hours'),
(4, 1, 'Introduction to Artificial Intelligence', '12 hours'),
(4, 2, 'Generative AI: Introduction and Applications', '8 hours'),
(4, 3, 'Generative AI: Prompt Engineering Basics', '9 hours'),
(4, 4, 'Building AI Powered Chatbots Without Programming', '14 hours'),
(6, 1, 'Welcome to the exciting world of AI', '24 minutes'),
(6, 2, 'Discover how AI works', '16 minutes'),
(6, 3, 'AI for professionals', '20 minutes'),
(6, 4, 'Review: Introduction to AI', '15 minutes'),
(7, 1, 'Introduction to AI', '1 hour'),
(7, 2, 'Maximize Productivity With AI Tools', '1 hour'),
(7, 3, 'Discover the Art of Prompting', '1 hour'),
(7, 4, 'Use AI Responsibly', '56 minutes'),
(7, 5, 'Stay Ahead of the AI Curve', '1 hour'),
(10, 1, 'Gen AI: Beyond the Chatbot', '1 hour 30 minutes'),
(10, 2, 'Gen AI: Unlock Foundational Concepts', '1 hour 30 minutes'),
(10, 3, 'Gen AI: Navigate the Landscape', '1 hour 15 minutes'),
(10, 4, 'Gen AI Apps: Transform Your Work', '1 hour 45 minutes'),
(10, 5, 'Gen AI Agents: Transform Your Organization', '2 hours 15 minutes'),
(11, 1, 'Introduction to Generative AI with Google Cloud', 'Part of 1 hour course'),
(11, 2, 'Introduction to Large Language Models with Google Cloud', 'Part of 1 hour course'),
(11, 3, 'Introduction to Responsible AI with Google Cloud', 'Part of 1 hour course'),
(11, 4, 'Generative AI Fundamentals Quiz', 'Part of 1 hour course'),
(14, 1, 'History and Overview of AI', '5 hours'),
(14, 2, 'Machine Learning Basics', '4 hours'),
(14, 3, 'Deep Learning and Gene', '4 hours'),
(14, 4, 'The Future of AI', '6 hours');

-- Insert new tools for Web & APP Builders – No Code category
INSERT INTO tools (name, category, description, url, sort_order) VALUES
('Autocoder.cc', 'Web & APP Builders – No Code', 'All-in-One Code Automation - UI, Backend, Database & More', 'https://www.autocoder.cc/platform', 1),
('BuiltByMe.ai', 'Web & APP Builders – No Code', 'Transform your words into fully-functional, web apps in minutes. Describe the web application you want to build...', 'https://builtbyme.ai/', 2),
('Google AI Studio', 'Web & APP Builders – No Code', 'Vibe Code with Gemini - Turn your ideas to functional, shareable apps with AI features built-in by default. Go from Prompt to Product in AI Studio.', 'https://aistudio.google.com/vibe-code', 3),
('OpenBuilder', 'Web & APP Builders – No Code', 'Describe what you would like to build', 'https://theopenbuilder.com/', 4);

-- Note: The sort_order values should be adjusted based on alphabetical order
-- along with any existing entries in this category

-- Insert new tools for Web & APP Builders – No Code category
-- Arranged in alphabetical order

INSERT INTO tools (name, category, description, url, sort_order) VALUES
('Kimi K2 Thinking', 'Web & APP Builders – No Code', 'Describe what you would like to build', 'https://www.kimi.com/', 1),
('Natively.dev', 'Web & APP Builders – No Code', 'Text to Mobile App', 'https://natively.dev/', 2);

-- Insert Gemini tools into the tools table
INSERT INTO tools (name, category, description, url, sort_order) VALUES
('Gemini - Canvas', 'Google Ecosystem', 'Canvas tool for creative work and collaboration', 'https://gemini.google.com/app', 10),
('Gemini - Create Images', 'Google Ecosystem', 'AI-powered image creation tool', 'https://gemini.google.com/app', 20),
('Gemini - Deep Research', 'Google Ecosystem', 'Advanced research capabilities with AI assistance', 'https://gemini.google.com/app', 30),
('Gemini - Dynamic View', 'Google Ecosystem', 'Dynamic content viewing and interaction', 'https://gemini.google.com/app', 40),
('Gemini - Gems', 'Google Ecosystem', 'Build AI apps, a new kind of Gem from Google Labs', 'https://gemini.google.com/app', 50),
('Gemini - Guided Learning', 'Google Ecosystem', 'AI-assisted learning and education tools', 'https://gemini.google.com/app', 60),
('Gemini - Labs', 'Google Ecosystem', 'Experimental features and cutting-edge AI capabilities', 'https://gemini.google.com/app', 70);

-- Insert Google AI Studio tools
INSERT INTO tools (name, category, description, url, sort_order) VALUES
('Google AI Studio - Create with Veo 3.1', 'Google Ecosystem', 'Our best video generation model, now with sound effects', 'https://aistudio.google.com/', 80),
('Google AI Studio - Gemini 3 Flash Preview', 'Google Ecosystem', 'Our most intelligent model built for speed, combining frontier intelligence with superior search and grounding', 'https://aistudio.google.com/', 90),
('Google AI Studio - Gemini 3 Pro Preview', 'Google Ecosystem', 'Our most intelligent model with SOTA reasoning and multimodal understanding, and powerful agentic and vibe coding capabilities', 'https://aistudio.google.com/', 100),
('Google AI Studio - Nano Banana Pro', 'Google Ecosystem', 'State-of-the-art image generation and editing model', 'https://aistudio.google.com/', 110);

-- Add new columns to tools table to support Review & Use Case information
ALTER TABLE tools 
ADD COLUMN use_case TEXT,
ADD COLUMN reviews TEXT,
ADD COLUMN cost_info TEXT;

-- Create index for better query performance
CREATE INDEX idx_tools_name ON tools(name);

-- Insert Top AI Chatbots data
INSERT INTO tools (name, category, description, url, use_case, reviews, cost_info, sort_order, featured) VALUES
('ChatGPT', 'Top AI Chatbots', 'ChatGPT is your AI chatbot for everyday use. Chat with the most advanced AI to explore ideas, solve problems, and learn faster.', 'https://chatgpt.com/', 
'Ideal for everyday conversations, problem-solving, content creation, coding assistance, learning new topics, brainstorming ideas, and general productivity tasks.',
'Users praise ChatGPT for its versatility, natural conversation flow, and ability to handle complex queries. Rated highly for creative writing and technical explanations.',
'Free tier available with GPT-3.5. ChatGPT Plus ($20/month) provides access to GPT-4, faster response times, and priority access during peak hours.',
1, true),

('Claude', 'Top AI Chatbots', 'Claude is a next generation AI assistant built by Anthropic and trained to be safe, accurate, and secure to help you do your best work.', 'https://claude.ai/',
'Best for detailed analysis, long-form content creation, coding projects, research assistance, and tasks requiring high accuracy and safety. Excels at understanding context and nuance.',
'Users appreciate Claude''s thoughtful responses, strong reasoning capabilities, and ethical approach. Particularly praised for handling sensitive topics and maintaining conversation context.',
'Free tier available with usage limits. Claude Pro ($20/month) offers 5x more usage, priority access, and early access to new features.',
2, true),

('NotebookLM', 'Top AI Chatbots', 'NotebookLM, the AI research tool and thinking partner that can analyze your sources, turn complexity into clarity and transform your content.', 'https://notebooklm.google/',
'Perfect for research projects, document analysis, note-taking, synthesizing information from multiple sources, academic work, and creating structured summaries from complex materials.',
'Users love NotebookLM for its ability to work with uploaded documents, create connections between sources, and generate insightful summaries. Highly rated for research and study purposes.',
'Currently free to use as part of Google''s AI experiments. Requires a Google account.',
3, true),

('Google Gemini', 'Top AI Chatbots', 'Gemini, Google''s AI assistant. Get help with writing, planning, brainstorming, and more. Experience the power of generative AI.', 'https://gemini.google.com/app',
'Excellent for integration with Google services, multimodal tasks (text, images, code), creative projects, planning, and leveraging Google''s search capabilities for up-to-date information.',
'Users value Gemini''s integration with Google ecosystem, multimodal capabilities, and access to current information. Praised for its versatility and Google Workspace integration.',
'Free tier available (Gemini). Gemini Advanced ($19.99/month via Google One AI Premium) provides access to more capable models, 2TB storage, and additional Google One benefits.',
4, true);

-- Add rating field to tools table
ALTER TABLE tools ADD COLUMN rating DECIMAL(2,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5);

-- Create system configuration table for admin settings
CREATE TABLE system_config (
    id BIGSERIAL PRIMARY KEY,
    config_key VARCHAR(100) NOT NULL UNIQUE,
    config_value TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert admin notification email configuration
INSERT INTO system_config (config_key, config_value, description) 
VALUES ('admin_notification_email', 'ivincentm@gmail.com', 'Email address to receive access request notifications');

-- Create admin user with specified credentials
-- Password will be hashed by the application layer
INSERT INTO users (email, password, role, name, access_status, approved_at) 
VALUES ('admin@adeptaitools', 'Pamusha@34', 'app20251014225423lezgriizlf_v1_admin_user', 'Admin', 'approved', CURRENT_TIMESTAMP);

-- Update the Top AI Chatbots with 5-star ratings
UPDATE tools SET rating = 5.0 WHERE name IN ('ChatGPT', 'Claude', 'NotebookLM', 'Google Gemini');

-- Create index for rating field
CREATE INDEX idx_tools_rating ON tools(rating);

-- Grant permissions on system_config table
GRANT SELECT, INSERT, UPDATE, DELETE ON system_config TO app20251014225423lezgriizlf_v1_admin_user;
GRANT SELECT ON system_config TO app20251014225423lezgriizlf_v1_user;

-- Add surname field to users table
ALTER TABLE users ADD COLUMN surname VARCHAR(255);

COMMENT ON COLUMN users.surname IS 'User surname/last name';

-- Create password change requests table
CREATE TABLE password_change_requests (
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

COMMENT ON TABLE password_change_requests IS 'Tracks user password change requests that require admin approval';
COMMENT ON COLUMN password_change_requests.user_id IS 'ID of user requesting password change';
COMMENT ON COLUMN password_change_requests.request_reason IS 'Optional reason provided by user';
COMMENT ON COLUMN password_change_requests.status IS 'Request status: pending, approved, rejected, completed';
COMMENT ON COLUMN password_change_requests.reviewed_by IS 'Admin user ID who reviewed the request';
COMMENT ON COLUMN password_change_requests.reviewed_at IS 'Timestamp when request was reviewed';
COMMENT ON COLUMN password_change_requests.admin_notes IS 'Notes added by admin during review';

-- Create indexes for performance
CREATE INDEX idx_password_change_requests_user_id ON password_change_requests(user_id);
CREATE INDEX idx_password_change_requests_status ON password_change_requests(status);
CREATE INDEX idx_password_change_requests_reviewed_by ON password_change_requests(reviewed_by);

-- Enable RLS on password_change_requests table
ALTER TABLE password_change_requests ENABLE ROW LEVEL SECURITY;

-- Users can only view and create their own password change requests
CREATE POLICY password_change_requests_select_policy ON password_change_requests
    FOR SELECT USING (user_id = uid());

CREATE POLICY password_change_requests_insert_policy ON password_change_requests
    FOR INSERT WITH CHECK (user_id = uid());

-- Users can update their own pending requests (e.g., to add more details)
CREATE POLICY password_change_requests_update_policy ON password_change_requests
    FOR UPDATE USING (user_id = uid() AND status = 'pending');

-- Grant permissions to roles
GRANT SELECT, INSERT, UPDATE, DELETE ON password_change_requests TO app20251014225423lezgriizlf_v1_admin_user;
GRANT SELECT, INSERT, UPDATE ON password_change_requests TO app20251014225423lezgriizlf_v1_user;

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_password_change_requests_updated_at
    BEFORE UPDATE ON password_change_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- AI News Sources table for the AI Guides page
CREATE TABLE ai_news_sources (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    url TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    thumbnail_url TEXT,
    category VARCHAR(100),
    badges TEXT[], -- Array of badge types: Newsletter, Tools Directory, Tech News, Company Blog, Templates
    featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_ai_news_sources_category ON ai_news_sources(category);
CREATE INDEX idx_ai_news_sources_featured ON ai_news_sources(featured);
CREATE INDEX idx_ai_news_sources_sort_order ON ai_news_sources(sort_order);
CREATE INDEX idx_ai_news_sources_name ON ai_news_sources(name);

-- Insert the curated AI news sources
INSERT INTO ai_news_sources (name, url, description, category, badges, sort_order) VALUES
('AI Product Index', 'https://github.com/dair-ai/AI-Product-Index', 'A comprehensive GitHub repository cataloging AI products and tools. Community-driven collection featuring categorized listings of artificial intelligence applications, frameworks, and resources for developers and researchers.', 'Tools Directory', ARRAY['Tools Directory', 'Open Source'], 1),

('AI Studios', 'https://app.deepbrain.io/dashboard', 'AI-powered video creation platform enabling users to generate professional videos with AI avatars. Features text-to-video conversion, multilingual support, and customizable virtual presenters for marketing and training content.', 'AI Tools', ARRAY['AI Tools', 'Video Creation'], 2),

('Ben''s Bites', 'https://www.bensbites.com/', 'Daily AI newsletter delivering curated news, product launches, and insights from the artificial intelligence ecosystem. Concise summaries of the latest developments in AI technology, startups, and research breakthroughs.', 'Newsletter', ARRAY['Newsletter', 'Daily Updates'], 3),

('Bubble.io', 'https://bubble.io/templates/', 'No-code platform offering pre-built templates for web applications. Extensive marketplace featuring customizable designs for SaaS products, marketplaces, and business tools without requiring programming knowledge.', 'Templates', ARRAY['Templates', 'No-Code'], 4),

('Decktopus', 'https://www.decktopus.com/', 'AI-assisted presentation creation tool that automatically designs professional slide decks. Smart formatting, content suggestions, and templates help users build compelling presentations quickly with minimal design effort.', 'AI Tools', ARRAY['AI Tools', 'Presentations'], 5),

('Detector Tools', 'https://detectortools.ai/', 'Specialized platform for AI content detection and verification tools. Helps identify AI-generated text, images, and media with accuracy metrics and detailed analysis for content authenticity validation.', 'Tools Directory', ARRAY['Tools Directory', 'AI Detection'], 6),

('Future AI Lab', 'https://newsletter.futureailab.com/', 'Weekly newsletter exploring emerging AI trends, research papers, and technological innovations. In-depth analysis of artificial intelligence developments with expert commentary on future implications and applications.', 'Newsletter', ARRAY['Newsletter', 'Research'], 7),

('Good AI Tools', 'https://goodaitools.com/', 'Curated directory of quality AI tools across multiple categories. Regularly updated collection featuring productivity apps, creative tools, and business solutions with user ratings and detailed descriptions.', 'Tools Directory', ARRAY['Tools Directory', 'Curated'], 8),

('The Rundown', 'https://www.rundown.ai/', 'Daily AI newsletter providing quick summaries of important developments in artificial intelligence. Covers breaking news, product releases, funding announcements, and technical breakthroughs in digestible format.', 'Newsletter', ARRAY['Newsletter', 'Daily Updates'], 9),

('The AI Report', 'https://www.theaireport.ai/ai-tool-database', 'Comprehensive database of AI tools with detailed reviews and comparisons. Searchable catalog featuring use cases, pricing information, and user feedback for hundreds of artificial intelligence applications.', 'Tools Directory', ARRAY['Tools Directory', 'Reviews'], 10),

('Toolkit', 'https://www.toolkit.club/', 'Community-driven collection of design and development tools. Curated resources for creators including AI-powered applications, plugins, and utilities with user recommendations and ratings.', 'Tools Directory', ARRAY['Tools Directory', 'Community'], 11),

('WhatPlugin AI', 'https://www.whatplugin.ai/', 'Discovery platform for ChatGPT plugins and AI extensions. Searchable directory helping users find and compare plugins with functionality descriptions, ratings, and integration guides.', 'Tools Directory', ARRAY['Tools Directory', 'Plugins'], 12),

('Testing Tools', 'https://www.testingtools.ai/', 'Specialized directory of AI-powered testing and quality assurance tools. Features automated testing solutions, bug detection systems, and performance monitoring applications for software development teams.', 'Tools Directory', ARRAY['Tools Directory', 'Testing'], 13),

('Google Blog', 'https://blog.google', 'Official Google blog covering company announcements, product launches, and technology insights. Regular updates on AI research, cloud services, and innovations from one of tech''s leading companies.', 'Company Blog', ARRAY['Company Blog', 'Tech News'], 14),

('Microsoft Blog', 'https://blogs.microsoft.com', 'Microsoft''s official blog featuring product news, developer resources, and industry perspectives. Coverage of Azure AI, cloud computing, enterprise solutions, and emerging technology trends from Microsoft teams.', 'Company Blog', ARRAY['Company Blog', 'Tech News'], 15),

('Wired', 'https://wired.com', 'Leading technology and culture magazine covering AI, science, and digital innovation. In-depth journalism exploring how technology shapes society, business, and daily life with investigative reporting.', 'Tech News', ARRAY['Tech News', 'Magazine'], 16),

('OpenAI', 'https://openai.com/', 'Official website of OpenAI featuring research papers, product announcements, and AI safety initiatives. Home of ChatGPT and GPT models with documentation, API access, and company mission information.', 'Company Blog', ARRAY['Company Blog', 'Research'], 17),

('Tech Brew', 'https://www.techbrew.com/', 'Morning newsletter delivering technology news and business insights. Concise coverage of tech industry trends, startup funding, product launches, and executive moves with analysis for professionals.', 'Newsletter', ARRAY['Newsletter', 'Business'], 18),

('Vice', 'https://www.vice.com/en/', 'Digital media company covering technology, culture, and global news. Features investigative journalism on AI ethics, tech policy, cybersecurity, and social impact of emerging technologies.', 'Tech News', ARRAY['Tech News', 'Culture'], 19),

('Forbes', 'https://www.forbes.com/', 'Business magazine featuring technology coverage, AI trends, and innovation stories. Analysis of tech companies, startup ecosystems, leadership insights, and market developments from industry experts.', 'Tech News', ARRAY['Tech News', 'Business'], 20),

('Technology Review', 'https://www.technologyreview.com/', 'MIT''s magazine covering emerging technologies and scientific breakthroughs. Authoritative reporting on AI research, biotechnology, computing, and innovations shaping the future with expert analysis.', 'Tech News', ARRAY['Tech News', 'Research'], 21),

('TechCrunch', 'https://techcrunch.com/', 'Leading technology news platform covering startups, venture capital, and product launches. Breaking news on tech companies, funding rounds, acquisitions, and industry trends with global coverage.', 'Tech News', ARRAY['Tech News', 'Startups'], 22),

('State of AI', 'https://www.stateof.ai/', 'Annual report analyzing AI progress, research breakthroughs, and industry developments. Comprehensive overview of artificial intelligence landscape with data-driven insights, predictions, and trend analysis.', 'Research', ARRAY['Research', 'Annual Report'], 23),

('The Verge', 'https://www.theverge.com/', 'Technology news and media network covering consumer electronics, AI, and digital culture. Reviews, analysis, and breaking news on gadgets, software, gaming, and tech industry developments.', 'Tech News', ARRAY['Tech News', 'Reviews'], 24),

('Tom''s Guide AI', 'https://www.tomsguide.com/au/ai', 'Consumer technology site featuring AI tool reviews and how-to guides. Practical advice on using artificial intelligence applications with comparisons, tutorials, and recommendations for everyday users.', 'Tech News', ARRAY['Tech News', 'Guides'], 25),

('Y Combinator Blog', 'https://www.ycombinator.com/blog/', 'Startup accelerator''s blog sharing entrepreneurship insights and company updates. Advice for founders, startup stories, and perspectives on building technology companies from YC partners and alumni.', 'Company Blog', ARRAY['Company Blog', 'Startups'], 26),

('You.com', 'https://you.com', 'AI-powered search engine offering personalized results and integrated tools. Privacy-focused alternative to traditional search with AI chat, code generation, and customizable search experiences.', 'AI Tools', ARRAY['AI Tools', 'Search'], 27);

-- Create trigger to automatically update the updated_at timestamp
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

-- Create AI Guides table to store guide entries
CREATE TABLE ai_guides (
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

-- Create indexes for better query performance
CREATE INDEX idx_ai_guides_category ON ai_guides(category);
CREATE INDEX idx_ai_guides_sort_order ON ai_guides(sort_order);
CREATE INDEX idx_ai_guides_featured ON ai_guides(featured);

-- Insert the AI guide entries
INSERT INTO ai_guides (title, description, url, category, sort_order) VALUES
('Remove watermarks from ChatGPT output', 'Tool to remove watermarks and Unicode text from ChatGPT generated content', 'https://www.gptwatermark.com/', 'AI Tools', 1),
('Remove watermarks - GetGPT', 'Alternative tool for removing watermarks from AI-generated text', 'https://getgpt.app/watermark', 'AI Tools', 2),
('Signs of AI writing', 'Wikipedia guide on identifying characteristics of AI-generated writing', 'https://en.m.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing', 'AI Detection', 3),
('Stanford Storm AI', 'Stanford''s AI research and development platform', 'https://storm.genie.stanford.edu/', 'AI Research', 4),
('Prompt Engineering Guide', 'Comprehensive whitepaper on prompt engineering techniques from Kaggle', 'https://www.kaggle.com/whitepaper-prompt-engineering', 'AI Learning', 5);

-- Blog categories table (for organizing blog posts)
CREATE TABLE blog_categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Blog posts table
CREATE TABLE blog_posts (
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

-- Create indexes for better query performance
CREATE INDEX idx_blog_posts_category_id ON blog_posts(category_id);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_categories_slug ON blog_categories(slug);

-- Insert blog categories
INSERT INTO blog_categories (name, slug, description, sort_order) VALUES
('AI & Technology', 'ai-technology', 'Articles about artificial intelligence and emerging technologies', 1),
('Guides & Tutorials', 'guides-tutorials', 'Step-by-step guides and how-to articles', 2),
('Industry News', 'industry-news', 'Latest news and updates from the AI industry', 3),
('Best Practices', 'best-practices', 'Tips and best practices for using AI tools', 4),
('Case Studies', 'case-studies', 'Real-world examples and success stories', 5);

-- Insert placeholder blog posts with images from Unsplash
INSERT INTO blog_posts (title, slug, description, content, image_url, category_id, featured, published_at) VALUES
(
    'Understanding Modern Blogging: A Complete Guide',
    'understanding-modern-blogging-complete-guide',
    'A blog is a type of website where content is published on a recurring basis. Learn how blogs have evolved into powerful tools for communication, knowledge sharing, and building online communities.',
    'A blog is a type of website, or a dedicated section within a larger website, where an individual, group, or organization publishes written content on a recurring basis, usually organized into entries called posts that appear in reverse chronological order.

These posts often focus on a specific theme or area of interest and are written to communicate ideas, share knowledge, tell stories, explain concepts, or offer opinions in a clear and approachable way. Unlike static web pages, a blog is dynamic. It grows over time as new posts are added, creating an ongoing record of thought, expertise, or experience.

Blogs are commonly used to build an audience, establish credibility, encourage discussion, and keep content fresh. They may include text, images, videos, links, and reader comments, making them a flexible and interactive form of online publishing.

At its core, a blog is:

A place to share ideas, information, stories, or opinions

Updated over time, often with the newest posts shown first

Written in a conversational or explanatory style, rather than formal reports

Blogs can be about almost anything, for example:

Personal experiences or daily life

Education and how-to guides

News, commentary, or analysis

Hobbies like travel, food, tech, fitness, or art

Business topics, marketing, or professional expertise

Most blogs allow readers to interact by leaving comments, sharing posts, or subscribing for updates.

In short, a blog is a regularly updated online journal or information hub, created to inform, express, or connect with an audience.',
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
    2,
    true,
    CURRENT_TIMESTAMP
),
(
    'The Evolution of Digital Content Publishing',
    'evolution-digital-content-publishing',
    'Discover how blogs have transformed from simple online journals into sophisticated platforms for sharing knowledge, building communities, and establishing thought leadership in various industries.',
    'A blog is a type of website, or a dedicated section within a larger website, where an individual, group, or organization publishes written content on a recurring basis, usually organized into entries called posts that appear in reverse chronological order.

These posts often focus on a specific theme or area of interest and are written to communicate ideas, share knowledge, tell stories, explain concepts, or offer opinions in a clear and approachable way. Unlike static web pages, a blog is dynamic. It grows over time as new posts are added, creating an ongoing record of thought, expertise, or experience.

Blogs are commonly used to build an audience, establish credibility, encourage discussion, and keep content fresh. They may include text, images, videos, links, and reader comments, making them a flexible and interactive form of online publishing.

At its core, a blog is:

A place to share ideas, information, stories, or opinions

Updated over time, often with the newest posts shown first

Written in a conversational or explanatory style, rather than formal reports

Blogs can be about almost anything, for example:

Personal experiences or daily life

Education and how-to guides

News, commentary, or analysis

Hobbies like travel, food, tech, fitness, or art

Business topics, marketing, or professional expertise

Most blogs allow readers to interact by leaving comments, sharing posts, or subscribing for updates.

In short, a blog is a regularly updated online journal or information hub, created to inform, express, or connect with an audience.',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80',
    1,
    true,
    CURRENT_TIMESTAMP - INTERVAL '1 day'
),
(
    'Why Blogging Matters in the Digital Age',
    'why-blogging-matters-digital-age',
    'Explore the importance of blogging as a dynamic platform for communication. Learn how blogs serve as powerful tools for sharing expertise, building credibility, and engaging with audiences worldwide.',
    'A blog is a type of website, or a dedicated section within a larger website, where an individual, group, or organization publishes written content on a recurring basis, usually organized into entries called posts that appear in reverse chronological order.

These posts often focus on a specific theme or area of interest and are written to communicate ideas, share knowledge, tell stories, explain concepts, or offer opinions in a clear and approachable way. Unlike static web pages, a blog is dynamic. It grows over time as new posts are added, creating an ongoing record of thought, expertise, or experience.

Blogs are commonly used to build an audience, establish credibility, encourage discussion, and keep content fresh. They may include text, images, videos, links, and reader comments, making them a flexible and interactive form of online publishing.

At its core, a blog is:

A place to share ideas, information, stories, or opinions

Updated over time, often with the newest posts shown first

Written in a conversational or explanatory style, rather than formal reports

Blogs can be about almost anything, for example:

Personal experiences or daily life

Education and how-to guides

News, commentary, or analysis

Hobbies like travel, food, tech, fitness, or art

Business topics, marketing, or professional expertise

Most blogs allow readers to interact by leaving comments, sharing posts, or subscribing for updates.

In short, a blog is a regularly updated online journal or information hub, created to inform, express, or connect with an audience.',
    'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
    4,
    false,
    CURRENT_TIMESTAMP - INTERVAL '2 days'
),
(
    'Creating Engaging Content: The Art of Blogging',
    'creating-engaging-content-art-blogging',
    'Master the art of creating compelling blog content that resonates with your audience. Understand how blogs differ from static pages and why they remain essential for modern communication.',
    'A blog is a type of website, or a dedicated section within a larger website, where an individual, group, or organization publishes written content on a recurring basis, usually organized into entries called posts that appear in reverse chronological order.

These posts often focus on a specific theme or area of interest and are written to communicate ideas, share knowledge, tell stories, explain concepts, or offer opinions in a clear and approachable way. Unlike static web pages, a blog is dynamic. It grows over time as new posts are added, creating an ongoing record of thought, expertise, or experience.

Blogs are commonly used to build an audience, establish credibility, encourage discussion, and keep content fresh. They may include text, images, videos, links, and reader comments, making them a flexible and interactive form of online publishing.

At its core, a blog is:

A place to share ideas, information, stories, or opinions

Updated over time, often with the newest posts shown first

Written in a conversational or explanatory style, rather than formal reports

Blogs can be about almost anything, for example:

Personal experiences or daily life

Education and how-to guides

News, commentary, or analysis

Hobbies like travel, food, tech, fitness, or art

Business topics, marketing, or professional expertise

Most blogs allow readers to interact by leaving comments, sharing posts, or subscribing for updates.

In short, a blog is a regularly updated online journal or information hub, created to inform, express, or connect with an audience.',
    'https://images.unsplash.com/photo-1542435503-956c469947f6?w=800&q=80',
    2,
    false,
    CURRENT_TIMESTAMP - INTERVAL '3 days'
),
(
    'From Personal Journals to Professional Platforms',
    'personal-journals-professional-platforms',
    'Trace the journey of blogs from simple online diaries to sophisticated professional platforms. Learn how blogs have become essential tools for businesses, educators, and content creators.',
    'A blog is a type of website, or a dedicated section within a larger website, where an individual, group, or organization publishes written content on a recurring basis, usually organized into entries called posts that appear in reverse chronological order.

These posts often focus on a specific theme or area of interest and are written to communicate ideas, share knowledge, tell stories, explain concepts, or offer opinions in a clear and approachable way. Unlike static web pages, a blog is dynamic. It grows over time as new posts are added, creating an ongoing record of thought, expertise, or experience.

Blogs are commonly used to build an audience, establish credibility, encourage discussion, and keep content fresh. They may include text, images, videos, links, and reader comments, making them a flexible and interactive form of online publishing.

At its core, a blog is:

A place to share ideas, information, stories, or opinions

Updated over time, often with the newest posts shown first

Written in a conversational or explanatory style, rather than formal reports

Blogs can be about almost anything, for example:

Personal experiences or daily life

Education and how-to guides

News, commentary, or analysis

Hobbies like travel, food, tech, fitness, or art

Business topics, marketing, or professional expertise

Most blogs allow readers to interact by leaving comments, sharing posts, or subscribing for updates.

In short, a blog is a regularly updated online journal or information hub, created to inform, express, or connect with an audience.',
    'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&q=80',
    5,
    false,
    CURRENT_TIMESTAMP - INTERVAL '4 days'
),
(
    'Building Your Online Presence Through Blogging',
    'building-online-presence-through-blogging',
    'Learn how consistent blogging helps establish your online presence and credibility. Discover the key elements that make blogs effective tools for audience engagement and community building.',
    'A blog is a type of website, or a dedicated section within a larger website, where an individual, group, or organization publishes written content on a recurring basis, usually organized into entries called posts that appear in reverse chronological order.

These posts often focus on a specific theme or area of interest and are written to communicate ideas, share knowledge, tell stories, explain concepts, or offer opinions in a clear and approachable way. Unlike static web pages, a blog is dynamic. It grows over time as new posts are added, creating an ongoing record of thought, expertise, or experience.

Blogs are commonly used to build an audience, establish credibility, encourage discussion, and keep content fresh. They may include text, images, videos, links, and reader comments, making them a flexible and interactive form of online publishing.

At its core, a blog is:

A place to share ideas, information, stories, or opinions

Updated over time, often with the newest posts shown first

Written in a conversational or explanatory style, rather than formal reports

Blogs can be about almost anything, for example:

Personal experiences or daily life

Education and how-to guides

News, commentary, or analysis

Hobbies like travel, food, tech, fitness, or art

Business topics, marketing, or professional expertise

Most blogs allow readers to interact by leaving comments, sharing posts, or subscribing for updates.

In short, a blog is a regularly updated online journal or information hub, created to inform, express, or connect with an audience.',
    'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&q=80',
    4,
    false,
    CURRENT_TIMESTAMP - INTERVAL '5 days'
),
(
    'The Power of Consistent Content Creation',
    'power-consistent-content-creation',
    'Understand why regular blog updates matter and how they contribute to building a loyal audience. Explore the dynamic nature of blogs and their role in modern digital communication.',
    'A blog is a type of website, or a dedicated section within a larger website, where an individual, group, or organization publishes written content on a recurring basis, usually organized into entries called posts that appear in reverse chronological order.

These posts often focus on a specific theme or area of interest and are written to communicate ideas, share knowledge, tell stories, explain concepts, or offer opinions in a clear and approachable way. Unlike static web pages, a blog is dynamic. It grows over time as new posts are added, creating an ongoing record of thought, expertise, or experience.

Blogs are commonly used to build an audience, establish credibility, encourage discussion, and keep content fresh. They may include text, images, videos, links, and reader comments, making them a flexible and interactive form of online publishing.

At its core, a blog is:

A place to share ideas, information, stories, or opinions

Updated over time, often with the newest posts shown first

Written in a conversational or explanatory style, rather than formal reports

Blogs can be about almost anything, for example:

Personal experiences or daily life

Education and how-to guides

News, commentary, or analysis

Hobbies like travel, food, tech, fitness, or art

Business topics, marketing, or professional expertise

Most blogs allow readers to interact by leaving comments, sharing posts, or subscribing for updates.

In short, a blog is a regularly updated online journal or information hub, created to inform, express, or connect with an audience.',
    'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800&q=80',
    3,
    false,
    CURRENT_TIMESTAMP - INTERVAL '6 days'
),
(
    'Blogging Best Practices for Maximum Impact',
    'blogging-best-practices-maximum-impact',
    'Discover proven strategies for creating impactful blog content. Learn how to structure your posts, engage readers, and maintain a consistent publishing schedule for optimal results.',
    'A blog is a type of website, or a dedicated section within a larger website, where an individual, group, or organization publishes written content on a recurring basis, usually organized into entries called posts that appear in reverse chronological order.

These posts often focus on a specific theme or area of interest and are written to communicate ideas, share knowledge, tell stories, explain concepts, or offer opinions in a clear and approachable way. Unlike static web pages, a blog is dynamic. It grows over time as new posts are added, creating an ongoing record of thought, expertise, or experience.

Blogs are commonly used to build an audience, establish credibility, encourage discussion, and keep content fresh. They may include text, images, videos, links, and reader comments, making them a flexible and interactive form of online publishing.

At its core, a blog is:

A place to share ideas, information, stories, or opinions

Updated over time, often with the newest posts shown first

Written in a conversational or explanatory style, rather than formal reports

Blogs can be about almost anything, for example:

Personal experiences or daily life

Education and how-to guides

News, commentary, or analysis

Hobbies like travel, food, tech, fitness, or art

Business topics, marketing, or professional expertise

Most blogs allow readers to interact by leaving comments, sharing posts, or subscribing for updates.

In short, a blog is a regularly updated online journal or information hub, created to inform, express, or connect with an audience.',
    'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80',
    4,
    true,
    CURRENT_TIMESTAMP - INTERVAL '7 days'
);

-- First, let's ensure the admin user exists with the correct configuration
-- We'll update the admin user (id=1) with the proper password hash and access status

-- Update admin user with correct password hash for 'Pamusha@34'
-- Using bcrypt hash with cost factor 10
UPDATE users 
SET 
    password = '$2a$10$YourBcryptHashHere',  -- This will be replaced by the system with proper bcrypt hash
    access_status = 'approved',
    role = 'app20260201200132errnxcxiac_v1_admin_user',
    approved_at = CURRENT_TIMESTAMP,
    approved_by = 1
WHERE email = 'admin@aitools';

-- If the admin user doesn't exist, create it
INSERT INTO users (email, password, role, name, surname, access_status, approved_at, approved_by)
SELECT 
    'admin@aitools',
    '$2a$10$YourBcryptHashHere',  -- This will be replaced by the system with proper bcrypt hash
    'app20260201200132errnxcxiac_v1_admin_user',
    'Admin',
    'User',
    'approved',
    CURRENT_TIMESTAMP,
    1
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@aitools');

-- Verify the admin user configuration
-- This is a comment for verification purposes
-- SELECT id, email, role, access_status, approved_at FROM users WHERE email = 'admin@aitools';
