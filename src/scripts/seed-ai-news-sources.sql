
-- Seed AI News Sources
-- This script populates the ai_news_sources table with curated AI news and tool sources

INSERT INTO ai_news_sources (name, url, description, category, badges, featured, sort_order, thumbnail_url) VALUES
(
  'AI Product Index',
  'https://github.com/dair-ai/AI-Product-Index',
  'A comprehensive GitHub repository cataloging AI products and tools. Features community-curated listings of the latest AI applications, frameworks, and resources for developers and researchers.',
  'Tools Directory',
  ARRAY['Open Source', 'GitHub', 'Tools Directory'],
  true,
  1,
  'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=500&fit=crop'
),
(
  'AI Studios',
  'https://app.deepbrain.io/dashboard',
  'DeepBrain AI Studios provides AI-powered video creation tools with realistic AI avatars. Create professional videos with text-to-speech technology and customizable virtual presenters for marketing and training.',
  'AI Tools',
  ARRAY['Video Creation', 'AI Avatars', 'SaaS'],
  false,
  2,
  'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=500&fit=crop'
),
(
  'Ben''s Bites',
  'https://www.bensbites.com/',
  'Daily newsletter delivering the latest AI news, product launches, and industry insights. Covers breaking developments in machine learning, generative AI, and emerging technologies with concise summaries.',
  'Newsletter',
  ARRAY['Newsletter', 'Daily Updates', 'AI News'],
  true,
  3,
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop'
),
(
  'Bubble.io Templates',
  'https://bubble.io/templates/',
  'No-code platform offering pre-built templates for web applications. Includes AI-integrated templates for building SaaS products, marketplaces, and business tools without traditional coding.',
  'Templates',
  ARRAY['No-Code', 'Templates', 'Web Apps'],
  false,
  4,
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop'
),
(
  'Decktopus',
  'https://www.decktopus.com/',
  'AI-powered presentation builder that creates professional slide decks automatically. Features smart templates, content suggestions, and design optimization for business presentations and pitches.',
  'AI Tools',
  ARRAY['Presentations', 'Design', 'Business'],
  false,
  5,
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=500&fit=crop'
),
(
  'Detector Tools',
  'https://detectortools.ai/',
  'Suite of AI detection tools for identifying AI-generated content, deepfakes, and synthetic media. Helps verify authenticity of text, images, and videos in the age of generative AI.',
  'Tools Directory',
  ARRAY['AI Detection', 'Security', 'Verification'],
  false,
  6,
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=500&fit=crop'
),
(
  'Future AI Lab Newsletter',
  'https://newsletter.futureailab.com/',
  'Weekly newsletter exploring cutting-edge AI research, experimental projects, and future trends. Focuses on emerging technologies, AI ethics, and transformative applications of artificial intelligence.',
  'Newsletter',
  ARRAY['Newsletter', 'Research', 'Future Tech'],
  false,
  7,
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop'
),
(
  'Good AI Tools',
  'https://goodaitools.com/',
  'Curated directory of high-quality AI tools across categories including writing, design, coding, and productivity. Features user reviews, pricing comparisons, and detailed tool descriptions.',
  'Tools Directory',
  ARRAY['Tools Directory', 'Reviews', 'Curated'],
  true,
  8,
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop'
),
(
  'The Rundown AI',
  'https://www.rundown.ai/',
  'Daily AI newsletter delivering the most important news and developments in artificial intelligence. Provides quick summaries, tool recommendations, and analysis of AI industry trends.',
  'Newsletter',
  ARRAY['Newsletter', 'Daily Updates', 'Industry News'],
  true,
  9,
  'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=500&fit=crop'
),
(
  'The AI Report',
  'https://www.theaireport.ai/ai-tool-database',
  'Comprehensive database of AI tools with detailed reviews and comparisons. Covers enterprise solutions, developer tools, and consumer applications with regular updates and expert analysis.',
  'Tools Directory',
  ARRAY['Tools Directory', 'Database', 'Reviews'],
  false,
  10,
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop'
),
(
  'Toolkit Club',
  'https://www.toolkit.club/',
  'Community-driven platform showcasing the best tools for creators, developers, and entrepreneurs. Features AI tools, productivity apps, and resources with user ratings and recommendations.',
  'Tools Directory',
  ARRAY['Community', 'Tools Directory', 'Productivity'],
  false,
  11,
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop'
),
(
  'WhatPlugin AI',
  'https://www.whatplugin.ai/',
  'Directory of ChatGPT plugins and AI extensions. Helps users discover and compare plugins for enhancing AI assistants with specialized capabilities and integrations.',
  'Tools Directory',
  ARRAY['Plugins', 'ChatGPT', 'Extensions'],
  false,
  12,
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop'
),
(
  'Testing Tools AI',
  'https://www.testingtools.ai/',
  'Specialized directory of AI-powered testing and quality assurance tools. Features automated testing solutions, bug detection systems, and QA optimization platforms for developers.',
  'Tools Directory',
  ARRAY['Testing', 'QA', 'Development'],
  false,
  13,
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop'
),
(
  'Google AI Blog',
  'https://blog.google',
  'Official blog from Google covering AI research, product announcements, and technological breakthroughs. Features insights from Google researchers and engineers on machine learning innovations.',
  'Company Blog',
  ARRAY['Tech News', 'Research', 'Company Blog'],
  true,
  14,
  'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=800&h=500&fit=crop'
),
(
  'Microsoft AI Blog',
  'https://blogs.microsoft.com',
  'Microsoft''s official blog featuring AI developments, Azure AI services, and enterprise solutions. Covers cloud computing, machine learning platforms, and business AI applications.',
  'Company Blog',
  ARRAY['Tech News', 'Enterprise', 'Company Blog'],
  true,
  15,
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop'
),
(
  'Wired',
  'https://wired.com',
  'Leading technology publication covering AI, science, and digital culture. Features in-depth articles on AI ethics, emerging technologies, and the societal impact of artificial intelligence.',
  'Tech News',
  ARRAY['Tech News', 'Magazine', 'Culture'],
  false,
  16,
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop'
),
(
  'OpenAI',
  'https://openai.com/',
  'Official website of OpenAI, creators of ChatGPT and GPT models. Features research papers, product updates, API documentation, and insights into cutting-edge AI development.',
  'Company Blog',
  ARRAY['Research', 'Company Blog', 'AI Models'],
  true,
  17,
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop'
),
(
  'Tech Brew',
  'https://www.techbrew.com/',
  'Daily newsletter covering technology business news with focus on AI, startups, and innovation. Provides analysis of tech industry trends, funding rounds, and market developments.',
  'Newsletter',
  ARRAY['Newsletter', 'Business', 'Tech News'],
  false,
  18,
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=500&fit=crop'
),
(
  'Vice Tech',
  'https://www.vice.com/en/',
  'Vice''s technology section covering AI, digital culture, and tech policy. Features investigative journalism on AI ethics, privacy concerns, and the social implications of technology.',
  'Tech News',
  ARRAY['Tech News', 'Culture', 'Journalism'],
  false,
  19,
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop'
),
(
  'Forbes Technology',
  'https://www.forbes.com/',
  'Forbes technology coverage including AI business news, startup profiles, and industry analysis. Features insights on AI investments, market trends, and executive perspectives.',
  'Tech News',
  ARRAY['Tech News', 'Business', 'Finance'],
  false,
  20,
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop'
),
(
  'MIT Technology Review',
  'https://www.technologyreview.com/',
  'Prestigious publication from MIT covering breakthrough technologies and AI research. Features expert analysis, peer-reviewed insights, and deep dives into emerging AI applications.',
  'Tech News',
  ARRAY['Tech News', 'Research', 'Academic'],
  true,
  21,
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop'
),
(
  'TechCrunch',
  'https://techcrunch.com/',
  'Leading technology news platform covering AI startups, product launches, and venture capital. Provides breaking news, analysis, and coverage of tech conferences and events.',
  'Tech News',
  ARRAY['Tech News', 'Startups', 'VC'],
  true,
  22,
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop'
),
(
  'State of AI Report',
  'https://www.stateof.ai/',
  'Annual comprehensive report analyzing AI progress, research breakthroughs, and industry trends. Provides data-driven insights into AI capabilities, investments, and future predictions.',
  'Research',
  ARRAY['Research', 'Annual Report', 'Analysis'],
  true,
  23,
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop'
),
(
  'The Verge',
  'https://www.theverge.com/',
  'Popular technology news site covering AI, consumer tech, and digital culture. Features product reviews, industry analysis, and coverage of major tech company developments.',
  'Tech News',
  ARRAY['Tech News', 'Reviews', 'Consumer Tech'],
  true,
  24,
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop'
),
(
  'Tom''s Guide AI',
  'https://www.tomsguide.com/au/ai',
  'Consumer-focused AI coverage including product reviews, how-to guides, and practical applications. Helps users understand and implement AI tools in everyday life.',
  'Tech News',
  ARRAY['Tech News', 'Reviews', 'How-To'],
  false,
  25,
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop'
),
(
  'Y Combinator Blog',
  'https://www.ycombinator.com/blog/',
  'Official blog from Y Combinator featuring startup advice, AI company spotlights, and entrepreneurship insights. Covers trends in AI startups and venture-backed innovation.',
  'Company Blog',
  ARRAY['Startups', 'Company Blog', 'VC'],
  false,
  26,
  'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=500&fit=crop'
),
(
  'You.com',
  'https://you.com',
  'AI-powered search engine offering personalized results and integrated AI chat. Combines traditional search with generative AI to provide comprehensive answers and research assistance.',
  'AI Tools',
  ARRAY['Search Engine', 'AI Chat', 'Research'],
  false,
  27,
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=500&fit=crop'
);
