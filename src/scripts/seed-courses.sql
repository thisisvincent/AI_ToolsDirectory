
-- IBM COURSES
INSERT INTO courses (title, provider, description, url, duration, certificate_available, release_date, sort_order) VALUES
('Introduction to Artificial Intelligence - IBM (Coursera website)', 'IBM', 'Module 1: Introduction and Applications of AI (3 hours to complete)
Module 2: AI Concepts, Terminology, and Application (2 hours to complete)
Module 3: Business and Career Transformation (3 hours to complete)
Module 4: Issues, Concerns, and Ethical Considerations (3 hours to complete)', 'https://www.coursera.org/learn/introduction-to-ai', '11 hours', true, NULL, 1),

('Artificial Intelligence Fundamentals - IBM', 'IBM', 'Introduction to Artificial Intelligence
Natural Language Processing and Computer Vision
Machine Learning and Deep Learning
Run AI Models with IBM Watson Studio
AI Ethics
Your Future in AI: The Job Landscape
Duration: Not specified', 'https://skills.yourlearning.ibm.com/', 'Not specified', true, NULL, 2),

('IBM RAG (Retrieval-Augmented Generation) and Agentic AI Professional Certificate (Coursera website)', 'IBM', 'Course 1: Develop Generative AI Applications: Get Started (8 hours)
Course 2: Build RAG Applications: Get Started (6 hours)
Course 3: Vector Databases for RAG: An Introduction (9 hours)
Course 4: Advanced RAG with Vector Databases and Retrievers (7 hours)
Course 5: Build Multimodal Generative AI Applications (7 hours)
Course 6: Fundamentals of Building AI Agents (11 hours)
Course 7: Agentic AI with LangChain and LangGraph (10 hours)
Course 8: Agentic AI with LangGraph, CrewAI, AutoGen and BeeAI (12 hours)
Duration: 8 weeks to complete', 'https://www.coursera.org/professional-certificates/ibm-rag-and-agentic-ai', '8 weeks', true, NULL, 3),

('IBM AI Foundations for Everyone', 'IBM', 'Covers AI basics, ethics, and hands-on labs with Watson Studio. Certificate included.
Course 1: Introduction to Artificial Intelligence (12 hours)
Course 2: Generative AI: Introduction and Applications (8 hours)
Course 3: Generative AI: Prompt Engineering Basics (9 hours)
Course 4: Building AI Powered Chatbots Without Programming (14 hours)
4 weeks to complete', 'https://www.coursera.org/specializations/ai-foundations-for-everyone', '4 weeks', true, NULL, 4);

-- GOOGLE COURSES
INSERT INTO courses (title, provider, description, url, duration, certificate_available, release_date, sort_order) VALUES
('Introduction to Generative AI – Google (Coursera website)', 'GOOGLE', 'Module 1: Introduction to Generative AI (1 hour to complete)', 'https://www.coursera.org/learn/introduction-to-generative-ai', '1 hour', true, NULL, 5),

('Introduction to AI – Google (Coursera website)', 'GOOGLE', 'Module 1: Welcome to the exciting world of AI (24 minutes to complete)
Module 2: Discover how AI works (16 minutes to complete)
Module 3: AI for professionals (20 minutes to complete)
Module 4: Review: Introduction to AI (15 minutes to complete)', 'https://www.coursera.org/learn/google-introduction-to-ai', '1 hour 15 minutes', true, NULL, 6),

('Google AI Essentials Specialization – Google (Coursera website)', 'GOOGLE', 'Course 1: Introduction to AI (1 hour)
Course 2: Maximize Productivity With AI Tools (1 hour)
Course 3: Discover the Art of Prompting (1 hour)
Course 4: Use AI Responsibly (56 minutes)
Course 5: Stay Ahead of the AI Curve (1 hour)', 'https://www.coursera.org/specializations/ai-essentials-google', '5 hours', true, NULL, 7),

('Introduction to Generative AI - Google', 'GOOGLE', 'This is an introductory level microlearning course aimed at explaining what Generative AI is, how it is used, and how it differs from traditional machine learning methods. It also covers Google Tools to help you develop your own Gen AI apps.

Lesson: Introduction to Generative AI (22 minutes)
Lesson: Introduction to Generative AI: Reading (30 minutes)
Check: Introduction to Generative AL: Quiz (22 minutes)', 'https://www.skills.google/course_templates/536', '1 hour 14 minutes', true, NULL, 8),

('Introduction to image generation - Google Cloud (Coursera website)', 'GOOGLE', 'Module 1: Introduction to image generation (19 minutes)
https://skills.google', 'https://www.coursera.org/learn/introduction-to-image-generation', '19 minutes', true, NULL, 9),

('Generative AI Leader (Google) - For leaders; $99(AU$148) exam fee for certificate.', 'GOOGLE', 'Gen AI: Beyond the Chatbot
Duration: 1 hour 30 minutes

Gen AI: Unlock Foundational Concepts
Duration: 1 hour 30 minutes

Gen AI: Navigate the Landscape
Duration: 1 hour 15 minutes

Gen AI Apps: Transform Your Work
Duration: 1 hour 45 minutes

Gen AI Agents: Transform Your Organization
Duration: 2 hours 15 minutes', 'https://www.skills.google/paths/1951', '8 hours 15 minutes', true, NULL, 10),

('Generative AI Fundamentals with Google Cloud', 'GOOGLE', '1-hour course on generative AI vs. traditional ML. Shareable certificate.

Course Outline: 4 lessons

L1 Introduction to Generative AI with Google Cloud
This is an introductory level microlearning course aimed at explaining what Generative AI is, how it is used, and how it differs from traditional machine learning methods.

L2 Introduction to Large Language Models with Google Cloud
This is an introductory course that explores what large language models (LLM) are, the use cases where they can be utilized, and how you can use prompt tuning to enhance LLM performance.

L3 Introduction to Responsible AI with Google Cloud
This is an introductory-level microlearning course aimed at explaining what responsible AI is, why it''s important, and how Google implements responsible AI in their products.

L4 Generative AI Fundamentals Quiz
Pass the assessment in this course to demonstrate your understanding of foundational concepts in generative AI.', 'https://www.udacity.com/course/generative-ai-fundamentals-for-google-cloud--cd13291', '1 hour', true, NULL, 11);

-- Insert Google Cloud Training link as additional info
INSERT INTO courses (title, provider, description, url, duration, certificate_available, sort_order) VALUES
('Google Cloud Training', 'GOOGLE', 'Comprehensive Google Cloud AI training resources', 'https://cloud.google.com/learn/training', NULL, false, 12);

-- MICROSOFT COURSES
INSERT INTO courses (title, provider, description, url, duration, certificate_available, release_date, sort_order) VALUES
('Career Essentials in Generative AI – (Microsoft/LinkedIn)', 'MICROSOFT', 'Focuses on Copilot and business applications. Certificate free with LinkedIn Premium.

What Is Generative AI?
Learn about the basics of generative AI, including its history, popular models, how it works, ethical implications, and much more.
Released Mar 15, 2023

Your Top AI Questions Answered: AI Literacy for ...
Boost your awareness of core concepts in AI in this beginner-friendly course accessible to anyone.
Released Aug 1, 2025

Learning Microsoft 365 Copilot for Work
From creating compelling presentations to managing communications effortlessly, learn how Microsoft 365 Copilot helps you enhance your productivity as you work smarter and faster.
Released Aug 26, 2025

Using Generative AI Ethically at Work
Learn how to address common ethical issues when using generative AI-powered tools at work.
Released Jan 23, 2025

Everyday AI Concepts
Learn key artificial intelligence concepts and discover how AI can benefit your team, organization, products, and services.
Released Nov 5, 2026

5 courses 5 hours of content', 'https://www.linkedin.com/learning/paths/career-essentials-in-generative-ai-by-microsoft-and-linkedin', '5 hours', true, NULL, 13);

-- OTHER PROVIDERS
INSERT INTO courses (title, provider, description, url, duration, certificate_available, sort_order) VALUES
('Fundamentals of Machine Learning and Artificial Intelligence – AWS (Coursera website)', 'OTHER PROVIDERS', 'Module 1: Fundamentals of Machine Learning and AI (1 hour to complete)', 'https://www.coursera.org/learn/fundamentals-of-machine-learning-and-artificial-intelligence', '1 hour', true, NULL, 14),

('Introduction to Artificial Intelligence - University of Illinois Urbana-Champaign (Coursera website)', 'OTHER PROVIDERS', 'Module 1: History and Overview of AI (5 hours to complete)
Module 2: Machine Learning Basics (4 hours to complete)
Module 3: Deep Learning and Gene (4 hours to complete)
Module 4: The Future of AI (6 hours to complete)', 'https://www.coursera.org/learn/intro-to-artificial-intelligence', '19 hours', true, NULL, 15),

('Elements of AI - Beginner-friendly course. Certificate free.', 'OTHER PROVIDERS', NULL, 'https://www.elementsofai.com/', NULL, true, NULL, 16),

('Generative AI Fundamentals by Databricks', 'OTHER PROVIDERS', 'Delivery format: 4 videos
Duration not specified', 'https://www.databricks.com/resources/learn/training/generative-ai-fundamentals', 'Not specified', false, NULL, 17);

-- Insert course modules for courses that have detailed module information

-- IBM Course 1 Modules
INSERT INTO course_modules (course_id, module_number, module_title, module_description, duration) VALUES
((SELECT id FROM courses WHERE title = 'Introduction to Artificial Intelligence - IBM (Coursera website)'), 1, 'Introduction and Applications of AI', NULL, '3 hours to complete'),
((SELECT id FROM courses WHERE title = 'Introduction to Artificial Intelligence - IBM (Coursera website)'), 2, 'AI Concepts, Terminology, and Application', NULL, '2 hours to complete'),
((SELECT id FROM courses WHERE title = 'Introduction to Artificial Intelligence - IBM (Coursera website)'), 3, 'Business and Career Transformation', NULL, '3 hours to complete'),
((SELECT id FROM courses WHERE title = 'Introduction to Artificial Intelligence - IBM (Coursera website)'), 4, 'Issues, Concerns, and Ethical Considerations', NULL, '3 hours to complete');

-- IBM Artificial Intelligence Fundamentals Modules
INSERT INTO course_modules (course_id, module_number, module_title, module_description, duration) VALUES
((SELECT id FROM courses WHERE title = 'Artificial Intelligence Fundamentals - IBM'), 1, 'Introduction to Artificial Intelligence', NULL, NULL),
((SELECT id FROM courses WHERE title = 'Artificial Intelligence Fundamentals - IBM'), 2, 'Natural Language Processing and Computer Vision', NULL, NULL),
((SELECT id FROM courses WHERE title = 'Artificial Intelligence Fundamentals - IBM'), 3, 'Machine Learning and Deep Learning', NULL, NULL),
((SELECT id FROM courses WHERE title = 'Artificial Intelligence Fundamentals - IBM'), 4, 'Run AI Models with IBM Watson Studio', NULL, NULL),
((SELECT id FROM courses WHERE title = 'Artificial Intelligence Fundamentals - IBM'), 5, 'AI Ethics', NULL, NULL),
((SELECT id FROM courses WHERE title = 'Artificial Intelligence Fundamentals - IBM'), 6, 'Your Future in AI: The Job Landscape', NULL, NULL);

-- IBM RAG Course Modules
INSERT INTO course_modules (course_id, module_number, module_title, module_description, duration) VALUES
((SELECT id FROM courses WHERE title LIKE 'IBM RAG%'), 1, 'Develop Generative AI Applications: Get Started', NULL, '8 hours'),
((SELECT id FROM courses WHERE title LIKE 'IBM RAG%'), 2, 'Build RAG Applications: Get Started', NULL, '6 hours'),
((SELECT id FROM courses WHERE title LIKE 'IBM RAG%'), 3, 'Vector Databases for RAG: An Introduction', NULL, '9 hours'),
((SELECT id FROM courses WHERE title LIKE 'IBM RAG%'), 4, 'Advanced RAG with Vector Databases and Retrievers', NULL, '7 hours'),
((SELECT id FROM courses WHERE title LIKE 'IBM RAG%'), 5, 'Build Multimodal Generative AI Applications', NULL, '7 hours'),
((SELECT id FROM courses WHERE title LIKE 'IBM RAG%'), 6, 'Fundamentals of Building AI Agents', NULL, '11 hours'),
((SELECT id FROM courses WHERE title LIKE 'IBM RAG%'), 7, 'Agentic AI with LangChain and LangGraph', NULL, '10 hours'),
((SELECT id FROM courses WHERE title LIKE 'IBM RAG%'), 8, 'Agentic AI with LangGraph, CrewAI, AutoGen and BeeAI', NULL, '12 hours');

-- IBM AI Foundations Modules
INSERT INTO course_modules (course_id, module_number, module_title, module_description, duration) VALUES
((SELECT id FROM courses WHERE title = 'IBM AI Foundations for Everyone'), 1, 'Introduction to Artificial Intelligence', NULL, '12 hours'),
((SELECT id FROM courses WHERE title = 'IBM AI Foundations for Everyone'), 2, 'Generative AI: Introduction and Applications', NULL, '8 hours'),
((SELECT id FROM courses WHERE title = 'IBM AI Foundations for Everyone'), 3, 'Generative AI: Prompt Engineering Basics', NULL, '9 hours'),
((SELECT id FROM courses WHERE title = 'IBM AI Foundations for Everyone'), 4, 'Building AI Powered Chatbots Without Programming', NULL, '14 hours');

-- Google AI Essentials Modules
INSERT INTO course_modules (course_id, module_number, module_title, module_description, duration) VALUES
((SELECT id FROM courses WHERE title LIKE 'Google AI Essentials%'), 1, 'Introduction to AI', NULL, '1 hour'),
((SELECT id FROM courses WHERE title LIKE 'Google AI Essentials%'), 2, 'Maximize Productivity With AI Tools', NULL, '1 hour'),
((SELECT id FROM courses WHERE title LIKE 'Google AI Essentials%'), 3, 'Discover the Art of Prompting', NULL, '1 hour'),
((SELECT id FROM courses WHERE title LIKE 'Google AI Essentials%'), 4, 'Use AI Responsibly', NULL, '56 minutes'),
((SELECT id FROM courses WHERE title LIKE 'Google AI Essentials%'), 5, 'Stay Ahead of the AI Curve', NULL, '1 hour');

-- Google Introduction to AI Modules
INSERT INTO course_modules (course_id, module_number, module_title, module_description, duration) VALUES
((SELECT id FROM courses WHERE title = 'Introduction to AI – Google (Coursera website)'), 1, 'Welcome to the exciting world of AI', NULL, '24 minutes to complete'),
((SELECT id FROM courses WHERE title = 'Introduction to AI – Google (Coursera website)'), 2, 'Discover how AI works', NULL, '16 minutes to complete'),
((SELECT id FROM courses WHERE title = 'Introduction to AI – Google (Coursera website)'), 3, 'AI for professionals', NULL, '20 minutes to complete'),
((SELECT id FROM courses WHERE title = 'Introduction to AI – Google (Coursera website)'), 4, 'Review: Introduction to AI', NULL, '15 minutes to complete');

-- Google Introduction to Generative AI (skills.google) Modules
INSERT INTO course_modules (course_id, module_number, module_title, module_description, duration) VALUES
((SELECT id FROM courses WHERE title = 'Introduction to Generative AI - Google'), NULL, 'Introduction to Generative AI', NULL, '22 minutes'),
((SELECT id FROM courses WHERE title = 'Introduction to Generative AI - Google'), NULL, 'Introduction to Generative AI: Reading', NULL, '30 minutes'),
((SELECT id FROM courses WHERE title = 'Introduction to Generative AI - Google'), NULL, 'Introduction to Generative AL: Quiz', NULL, '22 minutes');

-- Google Generative AI Fundamentals with Google Cloud Modules
INSERT INTO course_modules (course_id, module_number, module_title, module_description, duration) VALUES
((SELECT id FROM courses WHERE title = 'Generative AI Fundamentals with Google Cloud'), 1, 'Introduction to Generative AI with Google Cloud', 'This is an introductory level microlearning course aimed at explaining what Generative AI is, how it is used, and how it differs from traditional machine learning methods.', NULL),
((SELECT id FROM courses WHERE title = 'Generative AI Fundamentals with Google Cloud'), 2, 'Introduction to Large Language Models with Google Cloud', 'This is an introductory course that explores what large language models (LLM) are, the use cases where they can be utilized, and how you can use prompt tuning to enhance LLM performance.', NULL),
((SELECT id FROM courses WHERE title = 'Generative AI Fundamentals with Google Cloud'), 3, 'Introduction to Responsible AI with Google Cloud', 'This is an introductory-level microlearning course aimed at explaining what responsible AI is, why it''s important, and how Google implements responsible AI in their products.', NULL),
((SELECT id FROM courses WHERE title = 'Generative AI Fundamentals with Google Cloud'), 4, 'Generative AI Fundamentals Quiz', 'Pass the assessment in this course to demonstrate your understanding of foundational concepts in generative AI.', NULL);

-- Google Generative AI Leader Modules
INSERT INTO course_modules (course_id, module_number, module_title, module_description, duration) VALUES
((SELECT id FROM courses WHERE title LIKE 'Generative AI Leader%'), 1, 'Gen AI: Beyond the Chatbot', 'Gen AI: Beyond the Chatbot is the first course of the Gen AI Leader learning path and has no prerequisites. This course aims to move beyond the basic understanding of chatbots to explore the true potential of generative AI for your organization. You explore concepts like foundation models and prompt engineering, which are crucial for leveraging the power of gen AI. The course also guides you through important considerations you should make when developing a successful gen AI strategy for your organization.', '1 hour 30 minutes'),
((SELECT id FROM courses WHERE title LIKE 'Generative AI Leader%'), 2, 'Gen AI: Unlock Foundational Concepts', 'Gen AI: Unlock Foundational Concepts is the second course of the Gen AI Leader learning path. In this course, you unlock the foundational concepts of generative AI by exploring the differences between AI, ML, and gen AI, and understanding how various data types enable generative AI to address business challenges. You also gain insights into Google Cloud strategies to address the limitations of foundation models and the key challenges for responsible and secure AI development and deployment.', '1 hour 30 minutes'),
((SELECT id FROM courses WHERE title LIKE 'Generative AI Leader%'), 3, 'Gen AI: Navigate the Landscape', 'Gen AI: Navigate the Landscape is the third course of the Gen AI Leader learning path. Gen AI is changing how we work and interact with the world around us. But as a leader, how can you harness its power to drive real business outcomes? In this course, you explore the different layers of building gen AI solutions, Google Cloud''s offerings, and the factors to consider when selecting a solution.', '1 hour 15 minutes'),
((SELECT id FROM courses WHERE title LIKE 'Generative AI Leader%'), 4, 'Gen AI Apps: Transform Your Work', 'Transform Your Work With Gen AI Apps is the fourth course of the Gen AI Leader learning path. This course introduces Google''s gen AI applications, such as Google Workspace with Gemini and NotebookLM. It guides you through concepts like grounding, retrieval augmented generation, constructing effective prompts and building automated workflows.', '1 hour 45 minutes'),
((SELECT id FROM courses WHERE title LIKE 'Generative AI Leader%'), 5, 'Gen AI Agents: Transform Your Organization', 'Gen AI Agents: Transform Your Organization is the fifth and final course of the Gen AI Leader learning path. This course explores how organizations can use custom gen AI agents to help tackle specific business challenges. You gain hands-on practice building a basic gen AI agent, while exploring the components of these agents, such as models, reasoning loops, and tools.', '2 hours 15 minutes');

-- Microsoft Career Essentials Modules
INSERT INTO course_modules (course_id, module_number, module_title, module_description, duration) VALUES
((SELECT id FROM courses WHERE title LIKE 'Career Essentials in Generative AI%'), 1, 'What Is Generative AI?', 'Learn about the basics of generative AI, including its history, popular models, how it works, ethical implications, and much more.', 'Released Mar 15, 2023'),
((SELECT id FROM courses WHERE title LIKE 'Career Essentials in Generative AI%'), 2, 'Your Top AI Questions Answered: AI Literacy for ...', 'Boost your awareness of core concepts in AI in this beginner-friendly course accessible to anyone.', 'Released Aug 1, 2025'),
((SELECT id FROM courses WHERE title LIKE 'Career Essentials in Generative AI%'), 3, 'Learning Microsoft 365 Copilot for Work', 'From creating compelling presentations to managing communications effortlessly, learn how Microsoft 365 Copilot helps you enhance your productivity as you work smarter and faster.', 'Released Aug 26, 2025'),
((SELECT id FROM courses WHERE title LIKE 'Career Essentials in Generative AI%'), 4, 'Using Generative AI Ethically at Work', 'Learn how to address common ethical issues when using generative AI-powered tools at work.', 'Released Jan 23, 2025'),
((SELECT id FROM courses WHERE title LIKE 'Career Essentials in Generative AI%'), 5, 'Everyday AI Concepts', 'Learn key artificial intelligence concepts and discover how AI can benefit your team, organization, products, and services.', 'Released Nov 5, 2026');

-- University of Illinois Modules
INSERT INTO course_modules (course_id, module_number, module_title, module_description, duration) VALUES
((SELECT id FROM courses WHERE title LIKE 'Introduction to Artificial Intelligence - University%'), 1, 'History and Overview of AI', NULL, '5 hours to complete'),
((SELECT id FROM courses WHERE title LIKE 'Introduction to Artificial Intelligence - University%'), 2, 'Machine Learning Basics', NULL, '4 hours to complete'),
((SELECT id FROM courses WHERE title LIKE 'Introduction to Artificial Intelligence - University%'), 3, 'Deep Learning and Gene', NULL, '4 hours to complete'),
((SELECT id FROM courses WHERE title LIKE 'Introduction to Artificial Intelligence - University%'), 4, 'The Future of AI', NULL, '6 hours to complete');
