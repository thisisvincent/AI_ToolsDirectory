
import { Category } from '@/types/tools';

export const categoriesData: Category[] = [
  {
    id: 'research-writing',
    name: 'Research and Writing Tools',
    description: 'Comprehensive tools for academic research and professional writing',
    icon: 'ResearchWriting',
    subcategories: [
      {
        id: 'writing-tools',
        name: 'Writing Tools',
        tools: [
          {
            id: 'aithor',
            name: 'Aithor.com',
            useCase: 'AI Writer - Essay, Literature review, Scholarly and creative works',
            url: 'https://aithor.com/'
          },
          {
            id: 'answerthis',
            name: 'Answerthis.ai',
            useCase: 'Find research gaps, write literature reviews, and complete your research from start to finish. All inside one AI research assistant',
            url: 'https://answerthis.io/'
          },
          {
            id: 'askyourpdf',
            name: 'AskyouPDF.ai',
            useCase: 'Lit generator, AI Writer/essay-maker, AI Humanizer, Lit Review, Chat with files, Summarise papers',
            url: 'https://askyourpdf.com/other-tools/'
          },
          {
            id: 'caktus',
            name: 'Caktus',
            useCase: 'Ultimate Academic Co-Pilot - Essay Writer, Text Humanizer',
            url: 'https://www.caktus.ai/'
          },
          {
            id: 'claude-ai',
            name: 'Claude AI (Anthropic)',
            useCase: 'Research, References, Writer',
            url: 'https://claude.ai/',
            featured: true
          },
          {
            id: 'cramly',
            name: 'Cramly',
            useCase: 'Essay Writing with real citations',
            url: 'https://www.cramly.ai/'
          },
          {
            id: 'deepseek',
            name: 'DeepSeek',
            useCase: 'Open-Source and Accessible powerful LLM including its flagship DeepSeek-R1 model, which rivals competitors like ChatGPT',
            url: 'https://chat.deepseek.com/sign_in'
          },
          {
            id: 'editgpt',
            name: 'EditGPT.app',
            useCase: 'AI writing, Proofread, edit and improve your writing',
            url: 'https://editgpt.app/'
          },
          {
            id: 'essayflow',
            name: 'EssayFlow',
            useCase: 'Generate plagiarism-free, undetectable essays that bypass AI detection with EssayFlow',
            url: 'https://essayflow.ai/'
          },
          {
            id: 'getconch',
            name: 'Getconch.ai',
            useCase: 'Undetectable AI Writing',
            url: 'https://www.getconch.ai/'
          },
          {
            id: 'isaac-editor',
            name: 'Isaac Editor',
            useCase: 'Research, edit, write with AI at your side',
            url: 'https://www.isaaceditor.com/'
          },
          {
            id: 'jenni-ai',
            name: 'Jenni.ai',
            useCase: 'Research Assistant. The AI-powered workspace to help you read, write, and organize research with ease. Generate a good RQ based on your research topic or to address the research gap',
            url: 'https://jenni.ai/'
          },
          {
            id: 'jotbot',
            name: 'JotBot',
            useCase: 'Writing and research. JotBot handles the struggle of finding the right words and sources — so you can focus on your ideas',
            url: 'https://myjotbot.com/'
          },
          {
            id: 'logically',
            name: 'Logically',
            useCase: 'AI-powered workspace for citation-backed research, managing references, conducting literature reviews, annotating PDFs, and writing amazing papers',
            url: 'https://logically.app'
          },
          {
            id: 'maxai',
            name: 'MaxAI.me browser extension',
            useCase: 'MaxAI.me browser extension helps you research, summarize, answer questions, polish writing, and generate drafts',
            url: 'https://www.maxai.me/'
          },
          {
            id: 'notebook-llm',
            name: 'Notebook LLM',
            useCase: 'NotebookLM is a personalized AI research assistant that uses Google\'s Gemini 1.5 Pro model',
            url: 'https://notebooklm.google.com/',
            featured: true
          },
          {
            id: 'paperpal',
            name: 'Paperpal',
            useCase: 'Generative AI for Academics - Language & Grammar errors, Paraphraser, Rewrite academic text, AI Reference Finder, Plagiarism Checker, Generate outlines, abstracts, titles, AI Essay Writer, Academic writing assistance',
            url: 'https://paperpal.com/'
          },
          {
            id: 'phrasly',
            name: 'Phrasly.ai',
            useCase: 'Content Generator, AI Detector, Humanizer',
            url: 'https://phrasly.ai/dashboard'
          },
          {
            id: 'researcher-life',
            name: 'Researcher.life',
            useCase: 'Everything a researcher needs. All in one place. Research Assistant, Journal finder, Academic writing/AI tools for research. Includes Paperpal Prime, Mind the GRAPH, R Discovery Prime, R Upskill',
            url: 'https://researcher.life/student-plan?'
          },
          {
            id: 'samwell-ai',
            name: 'Samwell AI',
            useCase: 'Complete academic toolkit for writing, research, and learning - Generate and Enhance Undetectable papers, Academic Essay Writer with citation, Research Paper, Literature Review, AI Tutor',
            url: 'https://www.samwell.ai/',
            featured: true
          },
          {
            id: 'scipub-plus',
            name: 'SciPub+',
            useCase: 'Simplifies academic writing',
            url: 'https://scipubplus.com/'
          },
          {
            id: 'scispace-writing',
            name: 'Scispace',
            useCase: 'Formerly Typeset - Find most relevant papers in minutes, Analyse, summarise, Drafting literature reviews, AI Writer, Chat with PDF, Literature Review, Paraphraser, Citation Generator, AI Detector',
            url: 'https://scispace.com/'
          },
          {
            id: 'skolar-ai',
            name: 'Skolar.ai',
            useCase: 'Research, Write, and Learn - Advanced Search Engine, Chat with your PDFs, Enhance Content Writing with AI. Finds relevant papers, writes lit review with sources and academic citations',
            url: 'https://skolar.ai/'
          },
          {
            id: 'upword',
            name: 'Upword',
            useCase: 'AI research assistant',
            url: 'https://www.upword.ai/'
          },
          {
            id: 'videmak',
            name: 'Videmak.net',
            useCase: 'Generate research proposals, literature review and citation tools with AI-powered automation',
            url: 'https://videmak.net/app/user/dashboard'
          }
        ]
      },
      {
        id: 'research-sites',
        name: 'Research Sites & Literature',
        tools: [
          {
            id: 'connected-papers',
            name: 'Connected Papers',
            useCase: 'Explore connected papers in a visual graph',
            url: 'https://www.connectedpapers.com'
          },
          {
            id: 'consensus',
            name: 'Consensus.app',
            useCase: 'Academic search engine - Find research papers. Get answers. Literature review, find research gaps systematic review of research & literature',
            url: 'https://consensus.app/'
          },
          {
            id: 'econstor',
            name: 'Econstor',
            useCase: 'Publications in Economics and Business Studies',
            url: 'https://www.econstor.eu'
          },
          {
            id: 'elicit',
            name: 'Elicit',
            useCase: 'Connected papers - lit review. Analyse research papers at superhuman speed. Automate time-consuming research tasks like summarizing papers, extracting data, and synthesizing your findings',
            url: 'https://elicit.com/'
          },
          {
            id: 'epsilon',
            name: 'Epsilon',
            useCase: 'Scientific Research - Epsilon uses AI to answer research questions with academic literature',
            url: 'https://www.epsilon-ai.com/'
          },
          {
            id: 'jstor',
            name: 'Jstor',
            useCase: 'JSTOR is digital library of academic journals, books, and primary sources founded in 1994. Originally containing digitized back issues of academic journals',
            url: 'https://www.jstor.org/'
          },
          {
            id: 'litmaps',
            name: 'Litmaps',
            useCase: 'Visualise your research - Literature mapping. Discover academic papers faster. Mindmaps, PDF Translation',
            url: 'https://www.litmaps.com/features'
          },
          {
            id: 'overleaf',
            name: 'Overleaf.com',
            useCase: 'Research, thesis writing, project proposals, and manuscripts for publication (also templates)',
            url: 'https://www.overleaf.com/'
          },
          {
            id: 'research-rabbit',
            name: 'ResearchRabbit',
            useCase: 'Use ResearchRabbit to find related papers, build citation maps, and track research trends. Find sources and literature review mapping',
            url: 'https://www.researchrabbit.ai/'
          },
          {
            id: 'scispace-research',
            name: 'Scispace',
            useCase: 'Find most relevant papers in minutes - Analyse, summarise papers, Draft literature reviews, AI Writer, Chat with PDF, Literature Review, Citation Generator, AI Detector',
            url: 'https://scispace.com/'
          }
        ]
      }
    ]
  },
  {
    id: 'academic-ai',
    name: 'Academic AI Tools',
    description: 'AI-powered tools designed specifically for academic work',
    icon: 'GraduationCap',
    subcategories: [
      {
        id: 'thesis-tools',
        name: 'Thesis Tools',
        tools: [
          {
            id: 'abstract-generator-askyourpdf',
            name: 'Abstract Generator - AskYourPDF',
            useCase: 'Tools for generating abstracts',
            url: 'https://askyourpdf.com/tools/abstract-generator'
          },
          {
            id: 'abstract-generator-chatgpt',
            name: 'Abstract Generator - ChatGPT',
            useCase: 'Tools for generating abstracts',
            url: 'https://chatgpt.com/g/g-4UWODpApy-abstract-generator'
          },
          {
            id: 'abstract-generator-classgist',
            name: 'Abstract Generator - Classgist',
            useCase: 'Tools for generating abstracts',
            url: 'https://www.classgist.com/abstract-generator.aspx'
          },
          {
            id: 'abstract-generator-coral',
            name: 'Abstract Generator - Coral AI',
            useCase: 'Tools for generating abstracts',
            url: 'https://www.getcoralai.com/abstract-generator'
          },
          {
            id: 'abstract-generator-editpad',
            name: 'Abstract Generator - Editpad',
            useCase: 'Tools for generating abstracts',
            url: 'https://www.editpad.org/tool/abstract-generator'
          },
          {
            id: 'academic-phrasebank',
            name: 'Academic Phrasebank',
            useCase: 'The Academic Phrasebank is a general resource for academic writers',
            url: 'https://www.phrasebank.manchester.ac.uk/'
          },
          {
            id: 'askyourpdf-thesis',
            name: 'AskyourPDF',
            useCase: 'Thesis Statement Generator',
            url: 'https://askyourpdf.com/tools/thesis-statement'
          },
          {
            id: 'deepl',
            name: 'Deepl',
            useCase: 'Accurate large text translation in different languages',
            url: 'https://www.deepl.com/en/translator'
          },
          {
            id: 'editpad-thesis',
            name: 'Editpad',
            useCase: 'Thesis Statement Generator Paraphrasing Tool Generator',
            url: 'https://www.editpad.org/tool/thesis-statement-generator'
          },
          {
            id: 'paraphrasing-tool-thesis',
            name: 'Paraphrasing tool',
            useCase: 'Thesis Statement Generator',
            url: 'https://paraphrasingtool.ai/writing/thesis-statement-generator/'
          },
          {
            id: 'phrasly-thesis',
            name: 'Phrasly.ai',
            useCase: 'Generate thesis statement. Content Generator, AI Detector, Humanizer',
            url: 'https://phrasly.ai/dashboard'
          },
          {
            id: 'scite',
            name: 'Scite',
            useCase: 'AI-powered research tool that helps researchers better discover and evaluate scientific literature through Smart Citations',
            url: 'https://scite.ai/'
          },
          {
            id: 'zoterobib',
            name: 'ZoteroBib(ZBIB)',
            useCase: 'Free, accurate citation and bibliography maker for APA, Chicago, Harvard, MLA, and 10000 other styles. Create a bibliography in any citation style',
            url: 'https://zbib.org/'
          }
        ]
      },
      {
        id: 'citations',
        name: 'Citations - find citations',
        tools: [
          {
            id: 'anara',
            name: 'Anara.com',
            useCase: 'Formerly Unriddle.ai - Read & Write research papers, Upload & explain research papers, paste content to generate references, Generate citations',
            url: 'https://anara.com/'
          },
          {
            id: 'sourcely',
            name: 'Sourcely',
            useCase: 'Academic Citations. Make finding sources for your research easier',
            url: 'https://app.sourcely.net/signup'
          }
        ]
      },
      {
        id: 'presentation-formatting',
        name: 'Presentation & Document formatting & Voice Tools',
        tools: [
          {
            id: 'adcreative',
            name: 'Adcreative.ai',
            useCase: 'Generate ad banners, texts, photoshoots, and videos',
            url: 'https://www.adcreative.ai/'
          },
          {
            id: 'chatba',
            name: 'ChatBA',
            useCase: 'Generate slides',
            url: 'https://www.chatba.com/'
          },
          {
            id: 'chatdev',
            name: 'Chatdev',
            useCase: 'Build your own GPTs',
            url: 'https://chatdev.toscl.com/'
          },
          {
            id: 'chatllm-abacus',
            name: 'ChatLLM.Abacus',
            useCase: 'Create presentation slides',
            url: 'https://chatllm.abacus.ai/'
          },
          {
            id: 'freepik',
            name: 'Freepik',
            useCase: 'Graphics | image | Mockup generator',
            url: 'https://www.freepik.com/'
          },
          {
            id: 'gamma-app',
            name: 'Gamma.app',
            useCase: 'Beautiful slides',
            url: 'https://gamma.app/'
          },
          {
            id: 'mylens',
            name: 'MyLens',
            useCase: 'MyLens AI turns your ideas and content into effective visuals that are interactive, editable, and ready to present',
            url: 'https://mylens.ai'
          },
          {
            id: 'otter-ai',
            name: 'Otter.ai',
            useCase: 'Voice transcription',
            url: 'https://otter.ai/'
          },
          {
            id: 'overleaf-presentation',
            name: 'Overleaf.com',
            useCase: 'Templates for theses. Research, thesis writing, project proposals, and manuscripts for publication',
            url: 'https://www.overleaf.com/'
          },
          {
            id: 'slideteam',
            name: 'Slideteam',
            useCase: 'Create a Stunning Presentation in Minutes Powered by AI',
            url: 'https://www.slideteam.net/'
          },
          {
            id: 'suna',
            name: 'Suna',
            useCase: 'Create Professional Documents, Graphics & Visuals and Presentations',
            url: 'https://www.suna.so/'
          }
        ]
      },
      {
        id: 'pdf-chat',
        name: 'PDF Chat Reader | Instant AI Answers',
        tools: [
          {
            id: 'acrobat-ai',
            name: 'Acrobat AI',
            useCase: 'Acrobat Generative AI Assistant - Talk to and analyse your PDFs',
            url: 'https://www.adobe.com/acrobat/'
          },
          {
            id: 'aili',
            name: 'Aili',
            useCase: 'Chat with files',
            url: 'https://aili.app/'
          },
          {
            id: 'aipdf',
            name: 'AIPDF',
            useCase: 'Chat with any file & Summarise',
            url: 'https://aipdf.ai/'
          },
          {
            id: 'audemic',
            name: 'Audemic',
            useCase: 'AI-powered research assistant that helps you find, summarize, and understand complex topics. Upload the PDF of any academic paper or import it from your reference manager. Listen to any academic paper. Choose between the full text or key statements.',
            url: 'https://audemic.io/'
          },
          {
            id: 'briefy',
            name: 'Briefy',
            useCase: 'Turns lengthy content into structured, easy-to-digest summaries',
            url: 'https://briefy.ai/?'
          },
          {
            id: 'chat-with-data',
            name: 'Chat With Data',
            useCase: 'Chat with files',
            url: 'https://www.chatwithdata.ai/'
          },
          {
            id: 'chatdoc',
            name: 'Chatdoc.com',
            useCase: 'Chat with files',
            url: 'https://chatdoc.com/'
          },
          {
            id: 'chathelp-ai',
            name: 'ChatHelpAI',
            useCase: 'Chat with files',
            url: 'https://chathelp.ai/'
          },
          {
            id: 'chatpdf',
            name: 'ChatPDF',
            useCase: 'Chat with files',
            url: 'https://www.chatpdf.com/'
          },
          {
            id: 'docanalyser',
            name: 'DocAnalyser',
            useCase: 'Talk to and analyse your PDFs',
            url: 'https://docanalyzer.ai/'
          },
          {
            id: 'doclime',
            name: 'Doclime',
            useCase: 'Chat with files',
            url: 'https://doclime.com/'
          },
          {
            id: 'docsai',
            name: 'DocsAI',
            useCase: 'Chat with files',
            url: 'https://docsai.app/'
          },
          {
            id: 'docsbot',
            name: 'DocsBot',
            useCase: 'Instant AI Answers from your Docs',
            url: 'https://docsbot.ai/'
          },
          {
            id: 'getcoralai',
            name: 'Getcoralai',
            useCase: 'Coral AI summarizes long documents in seconds. Find information, translate, transcribe, and get citations from your files.',
            url: 'https://www.getcoralai.com/'
          },
          {
            id: 'glimmer',
            name: 'Glimmer',
            useCase: 'Search through PDFs',
            url: 'https://withglimmer.com/'
          },
          {
            id: 'humata-ai',
            name: 'Humata.ai',
            useCase: 'Chat with files, Compare Files, Summarise, create reports',
            url: 'https://www.humata.ai/'
          },
          {
            id: 'julius-ai',
            name: 'Julius.ai',
            useCase: 'Research – Chat with your data. AI Detector, AI Chat, Graph Maker, Math AI, Statistical Software',
            url: 'https://julius.ai/'
          },
          {
            id: 'lightpdf',
            name: 'Lightpdf.com',
            useCase: 'AI summarizer, AI Analysis. Edit, convert, OCR, sign, annotate, chat with PDFs, and more. Accessible across desktop, mobile, and web platforms',
            url: 'https://lightpdf.com/'
          },
          {
            id: 'mindgrasp-ai',
            name: 'Mindgrasp.ai',
            useCase: 'Upload any content. Get notes, quizzes, and an AI tutor in seconds. Integrates with your favourite tools',
            url: 'https://www.mindgrasp.ai/'
          },
          {
            id: 'openpaper-ai',
            name: 'Openpaper.ai',
            useCase: 'Read, annotate, and understand papers. Use an AI assistant with contextual citations for responses you can trust.',
            url: 'https://openpaper.ai/about'
          },
          {
            id: 'pdf-ai',
            name: 'PDF.AI',
            useCase: 'Chat with files',
            url: 'https://pdf.ai/'
          },
          {
            id: 'pdfgpt',
            name: 'PDFGPT',
            useCase: 'Chat with files / analyse Docs, PDFs',
            url: 'https://www.pdfgpt.io/'
          },
          {
            id: 'recall',
            name: 'Recall',
            useCase: 'Summarize any online content',
            url: 'https://www.getrecall.ai/'
          },
          {
            id: 'tactic',
            name: 'Tactic',
            useCase: 'Generate insights from any document, anywhere',
            url: 'https://tactic.fyi/generative-insights/'
          },
          {
            id: 'tldrthis',
            name: 'TLDRthis',
            useCase: 'Summarize any Webpage in a click.',
            url: 'https://www.tldrthis.com/'
          }
        ]
      },
      {
        id: 'search-alternatives',
        name: 'Search Engine Alternatives',
        tools: [
          {
            id: 'perplexity',
            name: 'Perplexity',
            useCase: 'Search engine. Research, Writing, Content generator',
            url: 'https://www.perplexity.ai/'
          },
          {
            id: 'teach-anything',
            name: 'Teach Anything',
            useCase: 'Teach you Anything in seconds',
            url: 'https://www.teach-anything.com/'
          },
          {
            id: 'thinkany',
            name: 'Thinkany.ai',
            useCase: 'Search alternative',
            url: 'https://thinkany.ai/'
          }
        ]
      },
      {
        id: 'ai-assistants',
        name: 'AI Assistants | Chatbots | Writing',
        tools: [
          {
            id: 'chatgpt',
            name: 'Chat GPT',
            useCase: 'AI Search',
            url: 'https://chatgpt.com/'
          },
          {
            id: 'deepseek-assistant',
            name: 'Deepseek',
            useCase: 'Better and cheaper than ChatGPT',
            url: 'https://www.deepseek.com/'
          },
          {
            id: 'deeptab',
            name: 'Deeptab.net',
            useCase: 'MML browser extension',
            url: 'https://deeptab.net/'
          },
          {
            id: 'editgpt-assistant',
            name: 'EditGPT.app',
            useCase: 'Proofread, edit and improve your writing',
            url: 'https://editgpt.app/'
          },
          {
            id: 'gemini',
            name: 'Gemini',
            useCase: 'Generative Chat',
            url: 'https://gemini.google.com/app'
          },
          {
            id: 'le-chat',
            name: 'Le Chat by Mistral AI',
            useCase: 'AI-powered content creation and campaign optimization',
            url: 'https://chat.mistral.ai/chat'
          },
          {
            id: 'manus',
            name: 'Manus',
            useCase: 'Manus AI is an autonomous agent designed for complex, multi-step tasks, while ChatGPT is a conversational, general-purpose AI better suited for quick brainstorming and creative writing.',
            url: 'https://manus.im/app'
          },
          {
            id: 'meta-ai',
            name: 'Meta AI',
            useCase: 'Generative AI',
            url: 'https://www.meta.ai/'
          }
        ]
      },
      {
        id: 'ai-detectors',
        name: 'AI Detectors | Humanisers',
        tools: [
          {
            id: 'academicx',
            name: 'Academi.cx',
            useCase: 'AI Detector',
            url: 'https://academi.cx/'
          },
          {
            id: 'copyleaks',
            name: 'Copyleaks',
            useCase: 'Detects AI generated content',
            url: 'https://copyleaks.com/ai-content-detector'
          },
          {
            id: 'gptzero',
            name: 'GPTZero',
            useCase: 'AI content Detector',
            url: 'https://gptzero.me/'
          },
          {
            id: 'grubby-ai',
            name: 'Grubby.ai',
            useCase: 'Humanize AI text & bypass AI detectors',
            url: 'https://grubby.ai/'
          },
          {
            id: 'humanize-ai',
            name: 'Humanize ai',
            useCase: 'Transform your AI-generated content into natural, human-like text with the ultimate Humanize AI text tool.',
            url: 'https://www.humanizeai.pro/'
          },
          {
            id: 'humata',
            name: 'Humata',
            useCase: 'Ask questions across all of your files',
            url: 'https://www.humata.ai/'
          },
          {
            id: 'humbot-ai',
            name: 'Humbot.ai',
            useCase: 'Humanizes all ai generated content',
            url: 'https://humbot.ai/'
          },
          {
            id: 'kipper-ai',
            name: 'Kipper.ai',
            useCase: 'Undetectable AI Essay Writer & AI Bypass Tool',
            url: 'https://www.kipper.ai/'
          },
          {
            id: 'phrasly-ai',
            name: 'Phrasly.ai',
            useCase: 'Content Generator, AI Detector, Humanizer',
            url: 'https://phrasly.ai/dashboard'
          },
          {
            id: 'stealthgpt-ai',
            name: 'Stealthgpt.ai',
            useCase: 'Write and humanize AI papers, reports, and blogs. Bypass AI detection',
            url: 'https://www.stealthgpt.ai/'
          },
          {
            id: 'undetectable-ai',
            name: 'Undetectable.ai',
            useCase: 'AI Detector and Humanizer',
            url: 'https://undetectable.ai/'
          },
          {
            id: 'write-human',
            name: 'Write Human',
            useCase: 'AI Humaniser',
            url: 'https://writehuman.ai'
          }
        ]
      }
    ]
  },
  {
    id: 'tools-by-use-case',
    name: 'Tools by Use Case',
    description: 'Discover tools organized by specific use cases and applications',
    icon: 'Target',
    subcategories: [
      {
        id: 'top-ai-chatbots',
        name: 'Top AI Chatbots',
        tools: [
          {
            id: 'chatgpt-chatbot',
            name: 'ChatGPT (A)',
            useCase: 'ChatGPT is your AI chatbot for everyday use. Chat with the most advanced AI to explore ideas, solve problems, and learn faster.',
            url: 'https://chatgpt.com/',
            hasReviewDialog: true,
            rating: 5
          },
          {
            id: 'claude-chatbot',
            name: 'Claude (A)',
            useCase: 'Claude is a next generation AI assistant built by Anthropic and trained to be safe, accurate, and secure to help you do your best work.',
            url: 'https://claude.ai/',
            hasReviewDialog: true,
            rating: 5
          },
          {
            id: 'notebooklm-chatbot',
            name: 'NotebookLM(A)',
            useCase: 'NotebookLM, the AI research tool and thinking partner that can analyze your sources, turn complexity into clarity and transform your content.',
            url: 'https://notebooklm.google/',
            hasReviewDialog: true,
            rating: 5
          },
          {
            id: 'google-gemini-chatbot',
            name: 'Google Gemini (A)',
            useCase: 'Gemini, Google\'s AI assistant. Get help with writing, planning, brainstorming, and more. Experience the power of generative AI.',
            url: 'https://gemini.google.com/app',
            hasReviewDialog: true,
            rating: 5
          }
        ]
      },
      {
        id: 'google-tools',
        name: 'Google Ecosystem',
        tools: [
          {
            id: 'firebase',
            name: 'Firebase',
            useCase: 'Prototype, build & run modern, AI-powered experiences users love with Firebase, a platform designed to support you throughout your app development lifecycle',
            url: 'https://firebase.google.com/',
            featured: true
          },
          {
            id: 'gemini-app',
            name: 'Gemini',
            useCase: '1. Tools\n   • Deep Research\n   • Create images\n   • Canvas\n   • Guided Learning\n   • Dynamic view\n   • Labs\n\n2. Gems in Gemini\n   • Build AI apps, a new kind of Gem from Google Labs',
            url: 'https://gemini.google.com/app',
            featured: true
          },
          {
            id: 'gemini-for-education',
            name: 'Gemini for Education',
            useCase: 'Gemini for Education - New Gemini tools for students and educators. Gemini can help you save time, create personalized learning experiences, inspire fresh ideas, and learn confidently – all in a private and secure environment',
            url: 'https://edu.google.com/ai/gemini-for-education/',
            featured: true
          },
          {
            id: 'gemini-google-storybook',
            name: 'Gemini.google.com/gem/storybook',
            useCase: 'Create a customized picture book, for either children or adults, given a topic, an optional target audience age, and an optional art style for the images.',
            url: 'https://gemini.google.com/gem/storybook'
          },
          {
            id: 'google-ai-presentation-maker',
            name: 'Google AI Presentation Maker',
            useCase: 'Create and deliver presentations in your browser',
            url: 'https://workspace.google.com/intl/en_au/products/slides/',
            hasReviewDialog: true
          },
          {
            id: 'google-ai-studio',
            name: 'Google AI Studio',
            useCase: '1. Gemini 3 Pro Preview\n2. Nano Banana Pro\n3. Gemini 3 Flash Preview\n4. Veo 3.1',
            url: 'https://aistudio.google.com/',
            featured: true
          },
          {
            id: 'google-labs-apps',
            name: 'Google Labs Apps',
            useCase: 'Whisk, Flow, ImageFX, MusicFx',
            url: 'https://labs.google/fx/',
            featured: true
          },
          {
            id: 'google-labs-experiments',
            name: 'Google Labs Experiments Tools',
            useCase: 'Create, Develop, Explore, Learn, Play (More than 50 Tools available and these include • 1-Firebase • 2-LearnYourWay •3- Pomelli • 4-NotebookLM',
            url: 'https://labs.google/experiments',
            featured: true
          },
          {
            id: 'learnyourway',
            name: 'LearnYourWay',
            useCase: 'Learn Your Way transforms content into a dynamic and engaging learning experience tailored for you.',
            url: 'https://learnyourway.withgoogle.com',
            featured: true
          }
        ]
      },
      {
        id: 'productivity-tools',
        name: 'Productivity Tools',
        tools: [
          {
            id: 'bika',
            name: 'Bika',
            useCase: 'The first AI Organiser to build One-Person Company',
            url: 'https://www.Bika.ai'
          },
          {
            id: 'judeai',
            name: 'Judeai',
            useCase: 'Meet Jude, your AI real estate assistant. Full CRM with AI lead enrichment, territory intelligence to find likely sellers, direct mail campaigns, TREC form auto-fill, and multi-channel outreach',
            url: 'https://Judeai.com'
          },
          {
            id: 'knowt',
            name: 'Knowt',
            useCase: 'Knowt notes summariser',
            url: 'https://knowt.com/'
          },
          {
            id: 'knowt-teachers',
            name: 'Knowt Teachers',
            useCase: 'Knowt notes summariser for teachers',
            url: 'https://teachers.knowt.com/'
          },
          {
            id: 'magictool',
            name: 'Magictool',
            useCase: 'Magictool AI Chrome Extension. AI Productivity Copilot packed with ChatGPT and 20 AI features in one place. Includes Youtube Video Summarizer & AI Video Dubbing',
            url: 'https://magictool.ai/'
          },
          {
            id: 'mapify',
            name: 'Mapify',
            useCase: 'Summarize YouTube, PDFs/Docs, URLs, Podcast and Meeting Recordings into Mind Maps in seconds. Powered by GPT, Gemini, or other top LLMs.',
            url: 'https://mapify.so/'
          },
          {
            id: 'scribe',
            name: 'Scribe',
            useCase: 'Screen capture',
            url: 'https://scribe.com/'
          },
          {
            id: 'speechma',
            name: 'Speechma.com',
            useCase: 'Generate speech',
            url: 'https://speechma.com'
          },
          {
            id: 'tango-us',
            name: 'Tango.us',
            useCase: 'Tango.us - instructional video /software walkthroughs',
            url: 'https://www.tango.ai/'
          },
          {
            id: 'template-net-waiver',
            name: 'template.net/ai-waiver-generator',
            useCase: 'waiver-generator',
            url: 'https://www.template.net/ai-waiver-generator'
          },
          {
            id: 'waiver-forever',
            name: 'WaiverForever',
            useCase: 'AI Generator | WaiverForever',
            url: 'https://www.waiverforever.com/ai-generator'
          }
        ]
      },
      {
        id: 'ai-agents-automation',
        name: 'AI Agents & AI Automation',
        tools: [
          {
            id: 'codewords-ai',
            name: 'Codewords.ai',
            useCase: 'Create Automation workflows for any task',
            url: 'https://codewords.ai/'
          },
          {
            id: 'lindy-ai',
            name: 'Lindy.ai',
            useCase: 'Meet your first AI employee. Lindy is the simplest way for businesses to create, manage, and share agents. Now with just a prompt.',
            url: 'https://lindy.ai'
          },
          {
            id: 'string-com',
            name: 'String.com',
            useCase: 'Prompt, run, edit, and deploy AI agents in seconds',
            url: 'https://string.com'
          },
          {
            id: 'n8n',
            name: 'N8N',
            useCase: 'AI workflow automation and APPS',
            url: 'https://n8n.io/pricing/'
          }
        ]
      },
      {
        id: 'chat-ai-assistants',
        name: 'Chat AI Assistants',
        tools: [
          {
            id: 'eye2',
            name: 'Eye2',
            useCase: 'Ask a question. See What AIs Agree On',
            url: 'https://www.eye2.ai/'
          },
          {
            id: 'lmarena-ai',
            name: 'LMarena.ai',
            useCase: 'Compare answers across top AI models',
            url: 'https://lmarena.ai/'
          }
        ]
      },
      {
        id: 'all-in-one',
        name: 'All In One Tool For One Sub',
        tools: [
          {
            id: 'abacus',
            name: 'Abacus',
            useCase: 'All in one tool. Access best LLMS on market for one sub',
            url: 'https://chatllm.abacus.ai/'
          },
          {
            id: 'askyourpdf-allinone',
            name: 'AskyourPDF',
            useCase: 'All in one tool. Access best LLMS on market for one sub. AI Thesis Statement Generator, Literature Review Writer, Source Finder, AI Detector',
            url: 'https://askyourpdf.com/'
          },
          {
            id: 'clipzap',
            name: 'Clipzap.ai',
            useCase: 'Access best LLMS for video generation',
            url: 'https://www.clipzap.ai/'
          },
          {
            id: 'deepmind-models',
            name: 'Deepmind.google/models',
            useCase: 'Gemini (in Gemini app), Gemma (Google AI Studio), Veo (in Gemini app), Imagen (in Gemini app), Lyria (MusicFX DJ)',
            url: 'https://deepmind.google/models'
          },
          {
            id: 'deepsite',
            name: 'Deepsite',
            useCase: 'MML with multiple tools',
            url: 'https://deepsiteai.com/'
          },
          {
            id: 'gemini-allinone',
            name: 'Gemini',
            useCase: 'MML with multiple tools. Gemini 2.5 Flash, Gemini 2.5 Pro, Image generation and editing, Deep Research, Gemini Live, Canvas, Gems, Flow, Whisk, NotebookLM',
            url: 'https://gemini.google.com/'
          },
          {
            id: 'globalgpt',
            name: 'GlobalGPT',
            useCase: 'All in one tool',
            url: 'https://glbgpt.com'
          },
          {
            id: 'hunyuan-videoai',
            name: 'Hunyuan videoai',
            useCase: 'Hunyuan AI Video is a new, state of the art, AI Video Generator that creates high-quality videos from text descriptions. It\'s the most powerful open-source video generation model available.',
            url: 'https://hunyuanvideoai.com/'
          },
          {
            id: 'inflection',
            name: 'Inflection',
            useCase: 'LLM',
            url: 'https://inflection.ai/'
          },
          {
            id: 'imagine-art',
            name: 'Imagine.art',
            useCase: 'ImagineArt is the best AI creative suite that generates images, videos, shorts, and voice from text prompt. The platform includes advanced editing tool',
            url: 'https://www.imagine.art/'
          },
          {
            id: 'kimi',
            name: 'Kimi',
            useCase: 'Kimi, Kimi Slides, Kimi Code',
            url: 'https://www.kimi.com/'
          },
          {
            id: 'monica-im',
            name: 'Monica.im',
            useCase: 'All-in-one AI assistant.',
            url: 'https://monica.im/'
          },
          {
            id: 'openai-playground',
            name: 'Platform.openai.com/playground',
            useCase: 'Build agents',
            url: 'https://platform.openai.com/'
          },
          {
            id: 'perplexity-allinone',
            name: 'Perplexity.ai',
            useCase: 'All in one tool. Access best LLMS on market for one sub',
            url: 'https://www.perplexity.ai/'
          },
          {
            id: 'poe',
            name: 'Poe',
            useCase: 'Talk to ChatGPT, GPT-4o, Claude 3 Opus, DALLE 3, and millions of others - all on Poe for one sub',
            url: 'https://poe.com/'
          },
          {
            id: 'qwen-image-edit',
            name: 'Qwen image edit',
            useCase: 'Image generation, Web creation, AI Chat Assistant',
            url: 'https://qwen.ai/home'
          },
          {
            id: 'recraft-ai',
            name: 'Recraft.ai',
            useCase: 'Create and edit images, vectors, and mockups with leading AI models',
            url: 'https://www.recraft.ai/'
          },
          {
            id: 'replicate',
            name: 'Replicate.ai',
            useCase: 'Build and scale AI products. Run and fine-tune models. Deploy custom models.',
            url: 'https://replicate.com/'
          },
          {
            id: 'sider',
            name: 'Sider.ai',
            useCase: 'Multimodal AI. Reading & writing & Integrates ChatGPT 3.5/4o, Claude 3.5 & Gemini 1.5 Flash/Pro. Generative AI for imagery/graphic design. GPTsidekick - chat with GPT-4/Claude 3/Gemini Pro/MistralAI. Generate images with DALL-E 3/Stable Diffusion',
            url: 'https://sider.ai/'
          },
          {
            id: 'you',
            name: 'You',
            useCase: 'All in one tool. Access best LLMS on market for one sub',
            url: 'https://you.com/'
          }
        ]
      },
      {
        id: 'video-creation-editing',
        name: 'Video Creation & Editing Tools & Animation',
        tools: [
          {
            id: 'adobe-express',
            name: 'Adobe Express',
            useCase: 'Character animation',
            url: 'https://www.adobe.com/express/'
          },
          {
            id: 'aivideoapi',
            name: 'AIVideoapi.com/',
            useCase: 'Video Generator - All-in-one API Hub for AI Generated Video',
            url: 'https://www.aivideoapi.com/'
          },
          {
            id: 'aura-app',
            name: 'Aura app',
            useCase: 'Create professional videos with exclusive access to Google\'s Veo 2, Veo 3, and Minimax - all in one powerful platform',
            url: 'https://auraai.app/'
          },
          {
            id: 'autoae',
            name: 'AutoAE',
            useCase: 'Create Viral Animations Viral Animations Online in Seconds. No editing. Just click, customize, and post.',
            url: 'https://autoae.online/'
          },
          {
            id: 'brainydocuments',
            name: 'Brainydocuments.com',
            useCase: 'Convert PDFs into professional videos with Brainy Docs. Key features like Slides Preview, Presentations, and Video Explainers make content transformation simple and engaging',
            url: 'https://brainydocuments.com/'
          },
          {
            id: 'clip-opus',
            name: 'Clip.opus/',
            useCase: 'Generate video clips',
            url: 'https://clip.opus.pro/dashboard',
            featured: true
          },
          {
            id: 'clip-studio',
            name: 'Clip.studio/',
            useCase: 'Video Generator - Create viral short-form videos with AI',
            url: 'https://clip.studio/'
          },
          {
            id: 'cogvideo',
            name: 'CogVideo',
            useCase: 'Generate stunning and unique videos from text using our advanced AI video generator',
            url: 'https://www.cogvideo.org/'
          },
          {
            id: 'colossyan',
            name: 'Colossyan.com/',
            useCase: 'Video Generator. Turn PDFs, PowerPoints, and scripts into training videos narrated by interactive AI avatars. Available in 100+ languages. No editing skills required.',
            url: 'http://colossyan.com/'
          },
          {
            id: 'creatify-ai',
            name: 'Creatify.ai/',
            useCase: 'AI-powered Video Ads',
            url: 'https://creatify.ai/'
          },
          {
            id: 'deepbrain',
            name: 'Deepbrain',
            useCase: 'Video Generator',
            url: 'https://app.deepbrain.io/dashboard'
          },
          {
            id: 'deepmind-veo',
            name: 'Deepmind.google/models/veo',
            useCase: 'Generate video',
            url: 'https://deepmind.google/models/veo/'
          },
          {
            id: 'descript',
            name: 'Descript',
            useCase: 'making how-to videos',
            url: 'http://descript.com/blog'
          },
          {
            id: 'diffusion-pro',
            name: 'Diffusion Pro',
            useCase: 'Generate, compose and render pro-quality videos with the first browser-native video & graphics editor.',
            url: 'https://diffusion.studio/'
          },
          {
            id: 'diffusion-studio-pro',
            name: 'Diffusion Studio Pro',
            useCase: 'Best for generating single assets (images, videos, music) in parallel.',
            url: 'https://pro.diffusion.studio/'
          },
          {
            id: 'dora',
            name: 'Dora',
            useCase: 'Build your dream site in just one prompt — for any topic, in any style.',
            url: 'https://www.dora.run/'
          },
          {
            id: 'dora-run',
            name: 'Dora.run',
            useCase: 'AI, ship 3D animated sites with zero code',
            url: 'https://www.dora.run/'
          },
          {
            id: 'dreamina',
            name: 'Dreamina',
            useCase: 'Create stunning images and videos from simple prompts with Dreamina\'s AI image and video generator. Perfect for posters, logos, and avatars.',
            url: 'https://dreamina.capcut.com/ai-tool/home/'
          },
          {
            id: 'faceless-video',
            name: 'Faceless.video',
            useCase: 'Use AI to automatically create and post custom videos daily',
            url: 'https://faceless.video/'
          },
          {
            id: 'flux-2',
            name: 'FLUX.2',
            useCase: 'Image generator, is now on Poe',
            url: 'https://FLUX.2 - BlackForestLabs'
          },
          {
            id: 'floya-ai',
            name: 'Floya ai',
            useCase: 'Video Generator',
            url: 'https://www.floya.ai/'
          },
          {
            id: 'gemini-video',
            name: 'Gemini',
            useCase: 'Generative AI',
            url: 'https://gemini.google.com/app'
          },
          {
            id: 'genmo-mochi-1',
            name: 'Genmo Mochi 1',
            useCase: 'Mochi 1 is our cutting-edge open-source text-to-video model, crafted to turn your written concepts into engaging visual stories. Run it locally, customize it for your needs, or contribute to the future of AI video generation.',
            url: 'https://www.genmo.ai/'
          },
          {
            id: 'goenhance',
            name: 'GoEnhance',
            useCase: 'Create AI animated short in Minutes',
            url: 'https://www.goenhance.ai/'
          },
          {
            id: 'golpo-ai',
            name: 'Golpo AI',
            useCase: 'Create Whiteboard Explainer Videos with Prompts / Documents',
            url: 'https://golpoai.com/'
          },
          {
            id: 'golpo-ai-video',
            name: 'Golpo ai',
            useCase: 'Text-to-Video AI Platform',
            url: 'https://video.golpoai.com/'
          },
          {
            id: 'google-flow',
            name: 'Google Flow',
            useCase: 'Flow is an AI filmmaking tool built with and for creatives. Seamlessly create cinematic clips, scenes and stories using Google\'s most capable generative AI models.',
            url: 'https://labs.google/flow/about'
          },
          {
            id: 'hailuoai-video',
            name: 'Hailuoai.video',
            useCase: 'Transform Ideas to Visuals',
            url: 'https://hailuoai.video/'
          },
          {
            id: 'hedra',
            name: 'Hedra',
            useCase: 'Multimodal content creation platform. An AI assistant that can help you with various tasks, including research and writing.',
            url: 'https://www.hedra.com/'
          },
          {
            id: 'heygen4',
            name: 'HeyGen4',
            useCase: 'Generate professional videos from simple prompts!',
            url: 'https://app.heygen.com/home',
            featured: true
          },
          {
            id: 'higgsfield',
            name: 'Higgsfield',
            useCase: 'Generate images and videos. Higgsfield has access to Veo 3, Kling, Wan 2.5 & more',
            url: 'https://higgsfield.ai/',
            featured: true
          },
          {
            id: 'hotshot',
            name: 'Hotshot',
            useCase: 'Video generator',
            url: 'https://hotshot.co/'
          },
          {
            id: 'ideogram-ai',
            name: 'Ideogram.ai',
            useCase: 'product images animations',
            url: 'https://www.ideogram.ai'
          },
          {
            id: 'imagine-art',
            name: 'Imagine.art',
            useCase: 'Type your prompt - turn ideas into stunning AI visuals (video & images)',
            url: 'https://www.imagine.art/'
          },
          {
            id: 'intangible-ai',
            name: 'Intangible.ai',
            useCase: 'image & video composition',
            url: 'https://studio.intangible.ai/'
          },
          {
            id: 'invideo-ai-v3',
            name: 'invideo AI V3',
            useCase: 'Generate AI Videos with just text. Includes Sora 2',
            url: 'https://invideo.io/'
          },
          {
            id: 'kling',
            name: 'Kling',
            useCase: 'Image to video, text to video. Example Use case: Image in Gemini, download it & upload in Kling AI and create. Seedream 4.0 - Seedream 4.generate image, upload it to Kling on Higgsfield. Image in gemini download it & upload in kling ai and create',
            url: 'https://klingai.com/global/'
          },
          {
            id: 'klingai-com',
            name: 'Klingai.com',
            useCase: 'Video Generator',
            url: 'https://app.klingai.com/global/'
          },
          {
            id: 'llama-3-1',
            name: 'Llama 3.1',
            useCase: 'LLMs/ Generative AI/MML',
            url: 'https://llama.meta.com/'
          },
          {
            id: 'longcat',
            name: 'Longcat',
            useCase: 'Generate Minutes-Long Videos with AI',
            url: 'https://longcat-video.com/'
          },
          {
            id: 'longcat-ai',
            name: 'Longcat ai',
            useCase: 'Generate video',
            url: 'https://longcat.chat/'
          },
          {
            id: 'ltx-studio',
            name: 'LTX.studio/',
            useCase: 'Visual Storytelling. The AI platform for video production. A creative suite for filmmakers, advertisers, & creative teams',
            url: 'https://ltx.studio/',
            featured: true
          },
          {
            id: 'lumalabs-ai',
            name: 'Lumalabs.ai',
            useCase: 'Lumalabs.ai (with Ray3Modify) Production-ready images and videos with precision, speed, and control',
            url: 'https://lumalabs.ai/'
          },
          {
            id: 'magi-1-ai',
            name: 'magi-1.ai',
            useCase: 'MAGI-1: Create Stunning AI Videos with Full Control. Turn one image into an endless video. MAGI-1 lets you control every second with unmatched quality and open-source freedom.',
            url: 'https://magi-1.ai'
          },
          {
            id: 'magichour-ai',
            name: 'Magichour.ai/',
            useCase: 'Generate studio-quality images & videos in minutes on one platform.',
            url: 'https://magichour.ai/',
            featured: true
          },
          {
            id: 'medeo-app',
            name: 'Medeo.app',
            useCase: 'AI Video Editor',
            url: 'https://medeo.app'
          },
          {
            id: 'minimax-hailuo-02',
            name: 'Minimax/hailuo-02',
            useCase: 'Animated product videos: Text to video -Google Image FX - generate image, then take image to Minimax ai which animates it',
            url: 'https://hailuoai.video/'
          },
          {
            id: 'moonvalley',
            name: 'Moonvalley',
            useCase: 'Create 3D Models',
            url: 'https://www.moonvalley.com/'
          },
          {
            id: 'nemovideo',
            name: 'NemoVideo',
            useCase: 'NemoVideo is your free AI video clipper and repurposing tool.',
            url: 'https://www.nemovideo.com/'
          },
          {
            id: 'nim-video',
            name: 'Nim.Video',
            useCase: 'The ultimate AI video app',
            url: 'https://nim.video/'
          },
          {
            id: 'omagic-ai',
            name: 'OMagic.ai',
            useCase: 'Upload your content and generate viral-ready CGI content in just a few clicks',
            url: 'https://omagic.ai/'
          },
          {
            id: 'opus-pro',
            name: 'Opus.pro',
            useCase: 'Opusclip turns long videos into shorts, and publishes them to all social platforms in one click.',
            url: 'https://www.opus.pro/join-opus-clip-now'
          },
          {
            id: 'pika-labs',
            name: 'Pika Labs',
            useCase: 'Video Generator - unlimited Lightning video generations. Animated product videos:',
            url: 'https://pika.art/'
          },
          {
            id: 'react-bits',
            name: 'React bits',
            useCase: 'Highly customizable animated components that make your React projects truly stand out',
            url: 'https://reactbits.dev/'
          },
          {
            id: 'runwayml',
            name: 'Runwayml.com',
            useCase: 'Turn Text Prompts into Storyboards. Build out entire storyboards in minutes. Edit, Transform and Generate Video',
            url: 'https://runwayml.com/'
          },
          {
            id: 'sand-ai',
            name: 'Sand.ai',
            useCase: 'Generate Video',
            url: 'https://sand.ai/'
          },
          {
            id: 'seaweed-apt2',
            name: 'Seaweed APT2',
            useCase: 'Video Generator',
            url: 'https://seaweed-apt.com/2'
          },
          {
            id: 'seedance-1-0',
            name: 'Seedance 1.0',
            useCase: 'Seedance AI Video Generator. Video: Uses Seedance, Kling, Haulio, Veo3, Wan 2.2, Seedream 4.0. Images: Nao Banana, Qwen',
            url: 'https://seedance.io/seedance'
          },
          {
            id: 'skyreels',
            name: 'Skyreels',
            useCase: 'All-in-one AI Video Creation',
            url: 'https://www.skyreels.ai/home'
          },
          {
            id: 'skyreels-huggingface',
            name: 'Skyreels - on Huggingface',
            useCase: 'Infinite-length Film Generative Model',
            url: 'https://huggingface.co/collections/Skywork/skyreels-v2-6801b1b93df627d41d00d9'
          },
          {
            id: 'sjinn-ai-video',
            name: 'Sjinn ai video',
            useCase: 'AI-powered image, video, audio, and 3D content creation',
            url: 'https://sjinn.ai/'
          },
          {
            id: 'sora',
            name: 'Sora',
            useCase: 'Video Generator, 720p resolution and 5s duration ChatGPT Plus $20/month',
            url: 'https://sora.com/'
          },
          {
            id: 'spotterstudio',
            name: 'Spotterstudio.com/',
            useCase: 'Create videos through an integrated suite of tools.',
            url: 'https://www.spotterstudio.com/'
          },
          {
            id: 'stable-diffusion',
            name: 'Stable Diffusion',
            useCase: 'Developed by Stability AI, Stable Diffusion is part of a new wave of generative AI technologies, specifically designed to create high-resolution, state-of-the-art videos.',
            url: 'https://stablevideodiffusion.pro/'
          },
          {
            id: 'stepvideo-2tv',
            name: 'StepVideo 2TV (open source)',
            useCase: 'StepVideoT2V is a state-of-the-art text-to-video pre-trained model featuring 30 billion parameters, capable of generating videos up to 204 frames in length.',
            url: 'https://stepvideot2v.com/'
          },
          {
            id: 'story-com',
            name: 'Story.com/',
            useCase: 'Video Generator',
            url: 'https://www.story.com/'
          },
          {
            id: 'storytribeapp-com',
            name: 'Storytribeapp.com',
            useCase: 'Free online storyboard maker',
            url: 'https://storytribeapp.com'
          },
          {
            id: 'synthesia-io',
            name: 'Synthesia.io/',
            useCase: 'Turn text to videos with AI avatars and voiceovers in 140+ languages.',
            url: 'https://www.synthesia.io/'
          },
          {
            id: 'synterial',
            name: 'Synterial',
            useCase: 'Create Viral Videos',
            url: 'https://synterial.com/#!'
          },
          {
            id: 'teachomatic-net',
            name: 'Teachomatic.net/',
            useCase: 'Create how-to videos with AI',
            url: 'https://www.teachomatic.net/'
          },
          {
            id: 'the-plot-io',
            name: 'The plot.io',
            useCase: 'Storyboards for video. Write a script & add visuals',
            url: 'https://theplot.io/'
          },
          {
            id: 'veed-io',
            name: 'Veed.io',
            useCase: 'Create Pro level videos in the Blink of AI',
            url: 'https://www.veed.io/'
          },
          {
            id: 'veo',
            name: 'Veo',
            useCase: 'Deepmind.google/models/veo',
            url: 'https://deepmind.google/'
          },
          {
            id: 'video-ocean',
            name: 'Video-ocean',
            useCase: 'Video & Image generator',
            url: 'https://video-ocean.com/en/app'
          },
          {
            id: 'videomagic',
            name: 'Videomagic',
            useCase: 'Video generator',
            url: 'https://www.videomagic.ai/template/e-commerce',
            featured: true
          },
          {
            id: 'videopal-ai',
            name: 'Videopal.ai/',
            useCase: 'Create viral faceless videos with AI',
            url: 'https://www.videopal.ai/'
          },
          {
            id: 'vidalgo',
            name: 'Vidalgo',
            useCase: 'Video generator',
            url: 'https://www.vidalgo.tech/'
          },
          {
            id: 'wan',
            name: 'Wan',
            useCase: 'Video Generator',
            url: 'https://wan.video'
          },
          {
            id: 'wan-2-5',
            name: 'Wan 2.5',
            useCase: 'Create professional, audio-synced videos from a single prompt. Wan 2.5 generates voice, music, and perfectly matched lip-sync in one pass.',
            url: 'https://www.wan-ai.co/wan-2-5',
            featured: true
          },
          {
            id: 'zeemo-ai',
            name: 'Zeemo.ai',
            useCase: 'Create viral videos',
            url: 'https://zeemo.ai/'
          }
        ]
      },
      {
        id: 'commercial-graphics',
        name: 'Commercial Graphics/Ads/Product',
        tools: [
          {
            id: 'adcreative-commercial',
            name: 'AdCreative',
            useCase: 'Generate ad banners, texts, photoshoots, and videos. AI tool for advertising',
            url: 'https://www.adcreative.ai/'
          },
          {
            id: 'affogato-ai',
            name: 'Affogato ai',
            useCase: 'Create viral product Ads',
            url: 'https://affogato.ai'
          },
          {
            id: 'arcads-ai',
            name: 'Arcads.ai',
            useCase: 'Create Ads with Arcads',
            url: 'https://www.arcads.ai'
          },
          {
            id: 'beacons',
            name: 'Beacons',
            useCase: 'Commercial graphics',
            url: 'https://beacons.ai/'
          },
          {
            id: 'cleanup-pictures',
            name: 'Cleanup.pictures',
            useCase: 'Remove any unwanted object, defect, people or text from your pictures in seconds',
            url: 'https://cleanup.pictures/'
          },
          {
            id: 'creatify-ai-commercial',
            name: 'Creatify.ai/',
            useCase: 'AI-powered Video Ads',
            url: 'https://creatify.ai/'
          },
          {
            id: 'dewstack',
            name: 'Dewstack',
            useCase: 'Create, Manage, and Host AI-Powered Knowledge Base, User Manuals, SOPs, Troubleshooting Guides and more.',
            url: 'https://dewstack.com/'
          },
          {
            id: 'dora-studio',
            name: 'Dora.studio',
            useCase: 'Transform your ideas into stunning motion graphics with just a chat.',
            url: 'https://www.dora.studio/'
          },
          {
            id: 'dreamina-commercial',
            name: 'Dreamina',
            useCase: 'Create stunning images and videos from simple prompts with Dreamina\'s AI image and video generator. Perfect for posters, logos, and avatars.',
            url: 'https://dreamina.capcut.com/ai-tool/home/'
          },
          {
            id: 'gamma',
            name: 'Gamma',
            useCase: 'Create presentations, websites effortlessly',
            url: 'https://gamma.app/'
          },
          {
            id: 'grazia-ai',
            name: 'Grazia.ai',
            useCase: 'Create Ads',
            url: 'https://www.grazia.ai/static_pages/home'
          },
          {
            id: 'hautech-ai',
            name: 'Hautech.ai/',
            useCase: 'Apparel images in, model photos out',
            url: 'https://www.hautech.ai/'
          },
          {
            id: 'hera-video',
            name: 'Hera.video',
            useCase: 'AI Motion Designer, Dashboards, Chats, Graphics',
            url: 'https://hera.video'
          },
          {
            id: 'icons8-lunacy',
            name: 'Icons8.com/lunacy',
            useCase: 'Generative AI Images|Graphics |Text',
            url: 'https://icons8.com/lunacy'
          },
          {
            id: 'ideogram-ai',
            name: 'Ideogram.ai/',
            useCase: 'Ideogram lets you turn product photos into custom-sized marketing assets with legible text.',
            url: 'https://ideogram.ai/'
          },
          {
            id: 'imagen-4',
            name: 'Imagen 4',
            useCase: 'text-to-image model',
            url: 'https://deepmind.google/models/imagen/'
          },
          {
            id: 'kittl',
            name: 'Kittl',
            useCase: 'Create Ads. The AI workspace that gives you full control - with vector editing and more.',
            url: 'https://kittl.com'
          },
          {
            id: 'krea-ai-logo',
            name: 'Krea.ai/apps/image/logo',
            useCase: 'Logo Generator',
            url: 'https://www.krea.ai/'
          },
          {
            id: 'leonardo-ai-commercial',
            name: 'Leonardo.Ai',
            useCase: 'Leverage generative AI with a unique suite of tools to convey your ideas to the world.',
            url: 'https://leonardo.ai/'
          },
          {
            id: 'lightpdf-commercial',
            name: 'Lightpdf.com',
            useCase: 'AI summarizer, AI Analysis, AI Create. Discover the most relevant. Edit, convert, OCR, sign, annotate, chat with PDFs, and more. Accessible across desktop, mobile, and web platforms',
            url: 'https://lightpdf.com/',
            featured: true
          },
          {
            id: 'logodiffusion',
            name: 'Logodiffusion.com/',
            useCase: 'Logo Generator',
            url: 'https://logodiffusion.com/'
          },
          {
            id: 'mindpal',
            name: 'Mindpal',
            useCase: 'AI workflow templates incl PESTLE Analysis',
            url: 'https://mindpal.space/'
          },
          {
            id: 'minimax-animates',
            name: 'Minimax ai animates it –',
            useCase: 'Use Google Image FX to generate image, then take image to Minimax ai which animates it',
            url: 'https://minimaxai.me/'
          },
          {
            id: 'mokker-ai',
            name: 'Mokker.ai/',
            useCase: 'AI Backgrounds for product pix',
            url: 'https://mokker.ai/'
          },
          {
            id: 'mylens-commercial',
            name: 'MyLens',
            useCase: 'MyLens AI turns your ideas and content into effective visuals that are interactive, editable, and ready to present.',
            url: 'https://mylens.ai'
          },
          {
            id: 'napkin-ai',
            name: 'Napkin AI',
            useCase: 'Generates graphics',
            url: 'https://www.napkin.ai/',
            featured: true
          },
          {
            id: 'neighborbrite',
            name: 'Neighborbrite.com/',
            useCase: 'Design a beautiful garden',
            url: 'https://neighborbrite.com/'
          },
          {
            id: 'pic-copilot',
            name: 'Pic Copilot',
            useCase: 'Fashion AI Model & AI Generated Product Images for commerce',
            url: 'https://www.piccopilot.com/'
          },
          {
            id: 'picnie',
            name: 'Picnie',
            useCase: 'Generative AI Images|Graphics |Text',
            url: 'https://picnie.com/'
          },
          {
            id: 'pippit',
            name: 'Pippit',
            useCase: 'Create powerful marketing content',
            url: 'https://pippit.capcut.com/?',
            featured: true
          },
          {
            id: 'playground-ai',
            name: 'Playground.ai.com/',
            useCase: 'Image Upscaler | Editor | Enhancer',
            url: 'https://www.playground.com/'
          },
          {
            id: 'predis-ai',
            name: 'Predis.ai',
            useCase: 'Use Predis to create ads, UGC videos, ad videos, ad copies, AI videos, and product videos from simple text prompts',
            url: 'https://predis.ai/'
          },
          {
            id: 'reimaginehome-ai',
            name: 'Reimaginehome.ai/',
            useCase: 'Instant Virtual Staging And More',
            url: 'https://www.reimaginehome.ai/'
          },
          {
            id: 'uizard-io',
            name: 'Uizard.io/',
            useCase: 'UI generators',
            url: 'https://uizard.io/'
          },
          {
            id: 'unscreen',
            name: 'Unscreen',
            useCase: 'Remove video background',
            url: 'https://www.unscreen.com/'
          },
          {
            id: 'videomagic-commercial',
            name: 'Videomagic',
            useCase: 'Video generator',
            url: 'https://www.videomagic.ai/template/e-commerce'
          },
          {
            id: 'visualize-graphy',
            name: 'Visualize.graphy.app/ai',
            useCase: 'Interactive charts',
            url: 'https://visualize.graphy.app/ai'
          },
          {
            id: 'vortex-channel',
            name: 'Vortex.channel',
            useCase: 'Generate research proposals with AI-powered automation',
            url: 'https://vortex.channel/',
            featured: true
          },
          {
            id: 'waymark',
            name: 'Waymark.com/',
            useCase: 'GenAI commercials',
            url: 'https://waymark.com/'
          },
          {
            id: 'winninghunter',
            name: 'Winninghunter.com',
            useCase: 'Find & Make Winning Ads & Products In Seconds!',
            url: 'https://winninghunter.com/'
          },
          {
            id: 'x-design',
            name: 'X-design.com',
            useCase: 'Generate Branding Guides',
            url: 'https://www.x-design.com/'
          },
          {
            id: 'zocket-ai',
            name: 'Zocket.ai/',
            useCase: 'Generative AI Social media ads',
            url: 'https://zocket.ai/'
          }
        ]
      },
      {
        id: 'gfx-art-visual',
        name: 'GFX & Art & Visual Presentations',
        tools: [
          {
            id: 'ezygraph',
            name: 'Ezygraph.com/',
            useCase: 'convert complex blog posts into visually appealing, simplified infographics',
            url: 'https://www.ezygraph.com/'
          },
          {
            id: 'firefly-adobe',
            name: 'Firefly.adobe.com/',
            useCase: 'Generative AI Images|Graphics |Text',
            url: 'http://firefly.adobe.com/'
          },
          {
            id: 'flourish-studio',
            name: 'Flourish, Studio',
            useCase: 'Create stunning charts, maps and interactive content that engage and inspire — instantly.',
            url: 'https://flourish.studio/'
          },
          {
            id: 'freepik-gfx',
            name: 'Freepik',
            useCase: 'Graphics| image | Mockup generator',
            url: 'https://www.freepik.com/'
          },
          {
            id: 'gamma-gfx',
            name: 'Gamma',
            useCase: 'Build Presentations, Documents, Websites',
            url: 'https://gamma.app'
          },
          {
            id: 'google-ai-presentation-maker',
            name: 'Google AI Presentation Maker',
            useCase: 'Create and deliver presentations in your browser',
            url: 'https://workspace.google.com/intl/en_au/products/slides/'
          },
          {
            id: 'google-ai-studio-gfx',
            name: 'Google AI Studio',
            useCase: 'Build apps and generate images',
            url: 'Www.aistudio.google.com'
          },
          {
            id: 'julius-ai-gfx',
            name: 'Julius.ai',
            useCase: 'Create stunning charts instantly',
            url: 'https://julius.ai/'
          },
          {
            id: 'kimi',
            name: 'Kimi',
            useCase: 'Generate presentations',
            url: 'https://www.kimi.com/'
          },
          {
            id: 'kimi-k2',
            name: 'Kimi K2',
            useCase: 'An AI bot for various tasks, including research and brainstorming.',
            url: 'https://www.kimi.com/kimiplus/slides'
          },
          {
            id: 'loveart-ai',
            name: 'Loveart.ai',
            useCase: 'Create stunning art with words. Learn the craft. Explore your style.',
            url: 'https://www.loveart.ai'
          },
          {
            id: 'manus-gfx',
            name: 'Manus',
            useCase: 'Generate images, slides webpages, spreadsheets, and more',
            url: 'https://manus.im/app'
          },
          {
            id: 'napkin-ai-gfx',
            name: 'Napkin.ai -',
            useCase: 'generate GFX from text',
            url: 'https://www.napkin.ai/',
            featured: true
          },
          {
            id: 'picdoc-ai',
            name: 'Picdoc.ai',
            useCase: 'Generate Visuals from Text. Generate a visual infographic from your text',
            url: 'https://www.picdoc.ai/'
          },
          {
            id: 'text-tools',
            name: 'Text Tools',
            useCase: 'Create text-behind-image designs',
            url: 'https://www.textbehindimage.com'
          }
        ]
      },
      {
        id: 'image-generation',
        name: 'Image Generation & Processing',
        tools: [
          {
            id: 'bing-image-creator',
            name: 'Bing.com/images/create',
            useCase: 'Image Generator',
            url: 'https://www.bing.com/images/create'
          },
          {
            id: 'cleanup-pictures-img',
            name: 'Cleanup.pictures',
            useCase: 'Remove any unwanted object, defect, people or text from your pictures in seconds',
            url: 'https://cleanup.pictures/'
          },
          {
            id: 'deepmind-google',
            name: 'Deepmind.google',
            useCase: 'Gemini - *Gemini 2.5 Flash Image (Nano Banana), Gemma, Veo, Imagen, Lyria',
            url: 'https://deepmind.google/models/'
          },
          {
            id: 'designer-microsoft',
            name: 'Designer.microsoft.com/',
            useCase: 'MML',
            url: 'https://designer.microsoft.com/'
          },
          {
            id: 'dreamina-img',
            name: 'Dreamina',
            useCase: 'Commercial graphics, ads, avatars, images, videos',
            url: 'https://dreamina.capcut.com/ai-tool/home/'
          },
          {
            id: 'firefly-adobe-img',
            name: 'Firefly.adobe.com/',
            useCase: 'Generative AI Images|Graphics |Text',
            url: 'http://firefly.adobe.com/'
          },
          {
            id: 'flibbo-mobile',
            name: 'Flibbo mobile app',
            useCase: 'Text generation on mobile',
            url: 'https://www.flibbo.com/'
          },
          {
            id: 'flux-1-pro',
            name: 'FLUX.1[pro]',
            useCase: 'Image generator, is now on Poe',
            url: 'https://www.fluxpro.ai/'
          },
          {
            id: 'freepik-img',
            name: 'Freepik',
            useCase: 'Graphics| image | Mockup generator',
            url: 'https://www.freepik.com/'
          },
          {
            id: 'freepik-upscaler',
            name: 'Freepik upscaler',
            useCase: 'AI Image Upscaler',
            url: 'https://www.freepik.com/ai/image-upscaler'
          },
          {
            id: 'google-ai-studio-img',
            name: 'Google AI Studio',
            useCase: 'Generate images',
            url: 'https://aistudio.google.com/models/gemini-2-5-flash-image'
          },
          {
            id: 'google-gemini-img',
            name: 'Google Gemini',
            useCase: 'Multimodal AI',
            url: 'https://gemini.google.com/advanced/?hl=en'
          },
          {
            id: 'google-imagen-3-img',
            name: 'Google\'s Imagen 3',
            useCase: 'Smart Image Generation and Optimization',
            url: 'https://deepmind.google/models/imagen/',
            featured: true
          },
          {
            id: 'icons8-lunacy-img',
            name: 'Icons8.com/lunacy',
            useCase: 'Generative AI Images|Graphics |Text',
            url: 'https://icons8.com/lunacy'
          },
          {
            id: 'imagen-4-2',
            name: 'Imagen 4 (2)',
            useCase: 'text-to-image model',
            url: 'https://deepmind.google/models/imagen/'
          },
          {
            id: 'ideogram',
            name: 'Ideogram',
            useCase: 'Generate stunning images, explore creative ideas, and turn inspiration into reality with Ideogram',
            url: 'https://ideogram.ai'
          },
          {
            id: 'imagine-meta',
            name: 'Imagine.meta.com/',
            useCase: 'Generative AI/ Image generator',
            url: 'https://imagine.meta.com/'
          },
          {
            id: 'krea-img',
            name: 'Krea',
            useCase: 'Image generation',
            url: 'https://www.krea.ai/'
          },
          {
            id: 'leornado',
            name: 'Leornado',
            useCase: 'LLM – images, graphics etc',
            url: 'https://leonardo.ai/'
          },
          {
            id: 'lupaupscaler',
            name: 'LupaUpscaler.com',
            useCase: 'LupaUpscaler.com',
            url: 'https://app.lupaupscaler.com/signup/1767439123552x364874793064557500'
          },
          {
            id: 'magnific-ai',
            name: 'Magnific.ai/',
            useCase: 'Image Upscaler | Editor | Enhancer',
            url: 'https://magnific.ai/'
          },
          {
            id: 'meta-ai-img',
            name: 'meta.ai',
            useCase: 'Image Generator',
            url: 'https://www.imagine.meta.com/'
          },
          {
            id: 'microsoft-ma1-1',
            name: 'Microsoft MA1-1',
            useCase: 'MAI-Image-1. Microsoft image generator. Available at bing.com/create',
            url: 'bing.com/create'
          },
          {
            id: 'midjourney',
            name: 'Midjourney',
            useCase: 'Midjourney is an image generator',
            url: 'https://www.midjourney.com/'
          },
          {
            id: 'mokker-ai-img',
            name: 'Mokker.ai/',
            useCase: 'AI backgrounds for product pix',
            url: 'https://mokker.ai/'
          },
          {
            id: 'mylens-img',
            name: 'MyLens',
            useCase: 'MyLens AI turns your ideas and content into effective visuals that are interactive, editable, and ready to present.',
            url: 'https://mylens.ai'
          },
          {
            id: 'nano-banana-pro',
            name: 'Nano banana Pro Paint on Higgsfield',
            useCase: 'Create images with Nano Banana Pro',
            url: 'https://higgsfield.ai/'
          },
          {
            id: 'napkin2',
            name: 'Napkin2',
            useCase: 'Napkin turns your text into visuals so sharing your ideas is quick and effective.',
            url: 'https://app.napkin.ai/',
            featured: true
          },
          {
            id: 'natively-dev',
            name: 'Natively.dev',
            useCase: 'Text to Mobile App',
            url: 'https://natively.dev/'
          },
          {
            id: 'open-ai-playground2',
            name: 'Open AI Playground2',
            useCase: 'Generative AI/ Image generator',
            url: 'https://platform.openai.com/playground'
          },
          {
            id: 'openai-dall-e-3',
            name: 'Openai.com/dall-e-3',
            useCase: 'Image Generator',
            url: 'https://openai.com/dall-e-3'
          },
          {
            id: 'pic-copilot-img',
            name: 'Pic Copilot',
            useCase: 'Create pictures that sell your products with Pic Copilot AI.',
            url: 'https://www.piccopilot.com/'
          },
          {
            id: 'picnie2',
            name: 'Picnie2',
            useCase: 'Generative AI Images|Graphics |Text',
            url: 'https://picnie.com/'
          },
          {
            id: 'playground-ai-img',
            name: 'Playgroundai.com/',
            useCase: 'Image Upscaler | Editor | Enhancer',
            url: 'https://www.playground.com/'
          },
          {
            id: 'remove-bg',
            name: 'Remove.bg',
            useCase: 'Background remover',
            url: 'Remove.bg'
          },
          {
            id: 'reve-ai',
            name: 'Reve ai',
            useCase: 'MM Models',
            url: 'https://www.reveai.art/'
          },
          {
            id: 'stillgram-io',
            name: 'Stillgram.io',
            useCase: 'Stillgram-Background remover IOS only https://stillgram.io/',
            url: 'https://stillgram.io/'
          },
          {
            id: 'upscayl-org',
            name: 'Upscayl.org/',
            useCase: 'Image Upscaler | Editor | Enhancer',
            url: 'https://www.upscayl.org/'
          },
          {
            id: 'vectorart-ai',
            name: 'Vectorart.ai/',
            useCase: 'Vector image generator',
            url: 'https://vectorart.ai/'
          },
          {
            id: 'vectorizer-ai',
            name: 'Vectorizer.ai',
            useCase: 'Vectorise an image',
            url: 'https://Vectorizer.ai'
          },
          {
            id: 'viesus-2',
            name: 'Viesus(2)',
            useCase: 'Enhances and upscales images and images in PDFs',
            url: 'https://www.viesus.cloud/'
          },
          {
            id: 'z-image-ai',
            name: 'Z-image.ai',
            useCase: 'Fast & Free image generator',
            url: 'https://z-image.ai/'
          },
          {
            id: 'z-image-turbo',
            name: 'Z Image Turbo',
            useCase: 'Open source image generator',
            url: 'https://zimageturbo.ai/'
          }
        ]
      },
      {
        id: 'multimodal-tools',
        name: 'Multimodal (MML) Tools (Image, Text, Video & Audio)',
        tools: [
          {
            id: 'chatllm-abacus-ai',
            name: 'Chatllm.abacus.ai',
            useCase: 'AI assistant with access to all top LLMs, video and image generators. General purpose and coding agents included.',
            url: 'https://chatllm.abacus.ai/'
          },
          {
            id: 'copilot-microsoft2',
            name: 'Copilot. Microsoft2',
            useCase: 'Generative AI',
            url: 'https://copilot.microsoft.com/'
          },
          {
            id: 'deepmind-google2',
            name: 'Deepmind.google2',
            useCase: 'Gemini - *Gemini 2.5 Flash Image (Nano Banana), Gemma, Veo, Imagen, Lyria',
            url: 'https://deepmind.google/models/'
          },
          {
            id: 'deepseek-mml',
            name: 'Deepseek',
            useCase: 'MML/LLM (better and cheaper than ChatGPT)',
            url: 'https://www.deepseek.com/'
          },
          {
            id: 'deeptab-net',
            name: 'Deeptab.net/',
            useCase: 'MML Browser Extension',
            url: 'https://deeptab.net/'
          },
          {
            id: 'dzine-ai',
            name: 'Dzine.ai',
            useCase: 'All-in-One Image & Video Studio',
            url: 'https://www.dzine.ai/'
          },
          {
            id: 'genspark-ai-2',
            name: 'Genspark.ai(2)',
            useCase: 'MML - Super agent',
            url: 'https://www.genspark.ai/'
          },
          {
            id: 'google-gemini-2',
            name: 'Google Gemini 2',
            useCase: 'Multimodal AI. Gemini app: Gemini 2.5 Flash, Gemini 2.5 Pro, Image generation and editing, Deep Research, Gemini Live, Canvas, Gems, Flow, Whisk, NotebookLM',
            url: 'https://gemini.google.co/fr/app'
          },
          {
            id: 'google-studio-2',
            name: 'Google Studio(2)',
            useCase: 'Multimodal AI',
            url: 'www.aistudio.google.com'
          },
          {
            id: 'gptsidekick',
            name: 'GPTsidekick',
            useCase: 'Generative AI - chat with GPT-4/Claude 3/Gemini Pro/MistralAI. Generate images with DALL-E 3/Stable Diffusion',
            url: 'https://gptsidekick.ai/'
          },
          {
            id: 'hailuoai',
            name: 'HailuoAI',
            useCase: 'MML',
            url: 'https://hailuoai.video/'
          },
          {
            id: 'hedra-mml',
            name: 'Hedra',
            useCase: 'Multimodal content creation platform. Create engaging content featuring the best generative image, video, and audio in your personal AI studio',
            url: 'https://www.hedra.com/'
          },
          {
            id: 'heygen-mml',
            name: 'Heygen',
            useCase: 'MML',
            url: 'https://app.heygen.com/home',
            featured: true
          },
          {
            id: 'hix',
            name: 'HIX',
            useCase: 'MML',
            url: 'https://hix.ai/'
          },
          {
            id: 'huggingface-clip',
            name: 'Huggingface - Clip',
            useCase: 'MML',
            url: 'https://huggingface.co/'
          },
          {
            id: 'inflection-mml',
            name: 'Inflection',
            useCase: 'LLM',
            url: 'https://inflection.ai/'
          },
          {
            id: 'leonardo-ai',
            name: 'Leonardo.ai',
            useCase: 'Leverage generative AI with a unique suite of tools to convey your ideas to the world.',
            url: 'https://leonardo.ai/'
          },
          {
            id: 'llama-3-1-mml',
            name: 'Llama 3.1',
            useCase: 'LLMs/ Generative AI/MML',
            url: 'https://llama.meta.com/'
          },
          {
            id: 'nordy-ai',
            name: 'Nordy.ai',
            useCase: 'Use Prompt to generate your own image or video',
            url: 'https://nordy.ai/login'
          },
          {
            id: 'open-ai-chat-gpt',
            name: 'Open AI Chat GPT',
            useCase: 'Generative AI/MML',
            url: 'https://openai.com/chatgpt/'
          },
          {
            id: 'openrouter',
            name: 'OpenRouter',
            useCase: 'One stop platform for LLM',
            url: 'https://openrouter.ai/'
          },
          {
            id: 'pi-ai',
            name: 'Pi.ai',
            useCase: 'MML - Generative AI – content writing, brainstorm ideas, Create podcast, brainstorm ideas',
            url: 'https://pi.ai/'
          },
          {
            id: 'playground-mml',
            name: 'Playground',
            useCase: 'Interactive web-based platform that allows users to experiment with various AI models developed by OpenAI. It\'s a tool for testing creative writing, coding assistance, brainstorming ideas, and exploring the capabilities of language models',
            url: 'Platform.Openai.com/playground'
          },
          {
            id: 'poe-mml',
            name: 'Poe',
            useCase: 'MMLs with various LLMs',
            url: 'https://poe.com/'
          },
          {
            id: 'seedance-1-0-mml',
            name: 'Seedance 1.0',
            useCase: 'Seedance AI Video Generator. Video: Uses Seedance, Kling, Haulio, Veo3, Wan 2.2, Seedream 4.0. Images: Nao Banana, Qwen',
            url: 'https://seedance.io/seedance'
          },
          {
            id: 'sider-ai-mml',
            name: 'Sider.ai',
            useCase: 'MML Browser Extension',
            url: 'https://Sider.ai'
          },
          {
            id: 'vortex-channel-mml',
            name: 'Vortex.channel',
            useCase: 'Generate research proposals with AI-powered automation',
            url: 'https://vortex.channel/',
            featured: true
          },
          {
            id: 'you-com2',
            name: 'You.com2',
            useCase: 'MML',
            url: 'https://you.com/'
          }
        ]
      },
      {
        id: 'generic-tools',
        name: 'Generic Tools',
        tools: [
          {
            id: 'bananaprompts-xyz',
            name: 'Bananaprompts.xyz',
            useCase: 'Unlimited image prompts for Gemini',
            url: 'https://bananaprompts.xyz/'
          },
          {
            id: 'gemini-google-storybook-2',
            name: 'Gemini.google.com/gem/storybook',
            useCase: 'Gemini.google.com/gem/storybook',
            url: 'https://gemini.google.com/gem/storybook'
          },
          {
            id: 'geminiwatermark-com',
            name: 'Geminiwatermark.com',
            useCase: 'Remove Gemini Watermark from Images. Free online AI tool to instantly erase Gemini watermarks and Nano Banana logo from your photos. Works with JPEG, PNG and other image formats - no software needed.',
            url: 'https://www.geminiwatermark.com/'
          },
          {
            id: 'super-whisper',
            name: 'Super whisper',
            useCase: 'Superwhisper: ultra-fast AI powered dictation that understands what you want to say and how you want to say it.',
            url: 'https://superwhisper.com/'
          }
        ]
      },
      {
        id: 'web-app-builders-no-code',
        name: 'Web & APP Builders – No Code',
        tools: [
          {
            id: 'autocoder-cc',
            name: 'Autocoder.cc',
            useCase: 'All-in-One Code Automation UI · Backend · Database & More',
            url: 'https://www.autocoder.cc/platform'
          },
          {
            id: 'base44',
            name: 'Base44.com',
            useCase: 'App-Builder. Base44 lets you build fully-functional apps in minutes with just your words. No coding necessary. Build apps & Sites with AI',
            url: 'https://base44.com'
          },
          {
            id: 'blink-new',
            name: 'Blink.new',
            useCase: 'Build and launch websites, SaaS apps, and mobile apps. Everything is included: database, hosting, AI, and more. Build apps & Sites with AI',
            url: 'https://blink.new/'
          },
          {
            id: 'bolt-new',
            name: 'Bolt.new',
            useCase: 'Create stunning apps & websites by chatting with AI. Requires TOO MANY tokens. Bolt v2 - Create course builder that generates output in different forms including xAPI, SCORM, html, PDF. Analyse the following course builders for inspiration: VM – add AI builders samples',
            url: 'https://bolt.new/'
          },
          {
            id: 'builtbyme-ai',
            name: 'BuiltByMe.ai',
            useCase: 'Transform your words into fully-functional, web apps in minutes. Describe the web application you want to build...',
            url: 'https://builtbyme.ai/'
          },
          {
            id: 'cursor-ai',
            name: 'Cursor AI',
            useCase: 'For building code and software',
            url: 'https://cursor.com/en'
          },
          {
            id: 'deepsite-web',
            name: 'Deepsite',
            useCase: 'An AI-powered website builder. Develop various AI applications with just one click, including intelligent games, website clones, and creative tools, without writing any code.',
            url: 'https://www.deepsite.app/'
          },
          {
            id: 'durable-co',
            name: 'Durable.co',
            useCase: 'AI business partner for websites, content, strategy, and more. Start growing online in 30 seconds. Build apps & Sites with AI',
            url: 'https://durable.co/'
          },
          {
            id: 'emergent-sh',
            name: 'Emergent.sh',
            useCase: 'An AI-powered website builder.',
            url: 'https://app.emergent.sh/login'
          },
          {
            id: 'firebase-studio',
            name: 'Firebase studio',
            useCase: 'Firebase Studio accelerates your entire development lifecycle with AI agents. Build backends, front ends, and mobile apps, all in one place',
            url: 'https://firebase.studio/'
          },
          {
            id: 'flames-blue-ai',
            name: 'Flames blue.ai',
            useCase: 'Build, deploy & monetize your app by chatting with Flames AI.',
            url: 'https://www.flames.blue/'
          },
          {
            id: 'flexapp-ai',
            name: 'Flexapp.ai',
            useCase: 'Build Mobile Apps With AI, Not Code. Describe your app idea and get production-ready React Native code generated by AI.',
            url: 'https://flexapp.ai'
          },
          {
            id: 'flexbe',
            name: 'Flexbe',
            useCase: 'Generate a website with AI. Build apps & Sites with AI',
            url: 'https://flexbe.ai/'
          },
          {
            id: 'framer-com',
            name: 'Framer.com',
            useCase: 'Create landing pages etc',
            url: 'https://www.framer.com/features/ai/'
          },
          {
            id: 'gamma-web',
            name: 'Gamma',
            useCase: 'Build Presentations, Documents, Websites',
            url: 'https://gamma.app'
          },
          {
            id: 'google-ai-studio-vibe-code',
            name: 'Google AI Studio',
            useCase: 'Vibe Code with Gemini. Turn your ideas to functional, shareable apps with AI features built-in by default. Go from Prompt to Product in AI Studio.',
            url: 'https://aistudio.google.com/vibe-code'
          },
          {
            id: 'instalanding-ai',
            name: 'Instalanding.ai',
            useCase: 'Generate landing pages. Copy and paste template on bolt.ai',
            url: 'https://instalanding.ai/'
          },
          {
            id: 'kimi-k2-thinking',
            name: 'Kimi K2 Thinking',
            useCase: 'Describe what you would like to build',
            url: 'https://www.kimi.com/'
          },
          {
            id: 'lovable-ai',
            name: 'Lovable ai',
            useCase: 'Generate landing pages and websites',
            url: 'https://lovable.dev/'
          },
          {
            id: 'manus-web',
            name: 'Manus',
            useCase: 'Generate images, slides webpages, spreadsheets & more',
            url: 'https://manus.im/app'
          },
          {
            id: 'mobirise',
            name: 'Mobirise',
            useCase: 'Generate any website with AI',
            url: 'ai.mobirise.com'
          },
          {
            id: 'natively-dev-web',
            name: 'Natively.dev',
            useCase: 'Text to Mobile App',
            url: 'https://natively.dev/'
          },
          {
            id: 'openbuilder',
            name: 'OpenBuilder',
            useCase: 'Describe what you would like to build',
            url: 'https://theopenbuilder.com/'
          },
          {
            id: 'replit',
            name: 'Replit',
            useCase: 'Build apps & Sites with AI',
            url: 'https://replit.com',
            featured: true
          },
          {
            id: 'rocket-new',
            name: 'Rocket.new',
            useCase: 'Build production-ready website',
            url: 'https://www.rocket.new/'
          },
          {
            id: 'runable',
            name: 'Runable',
            useCase: 'APP & Web builder',
            url: 'https://runable.com/'
          },
          {
            id: 'same-dev',
            name: 'Same.dev',
            useCase: 'Clone any site',
            url: 'https://Same.new'
          },
          {
            id: 'tile-dev',
            name: 'Tile.dev',
            useCase: 'APP builder. Launch production ready mobile apps with expert AI Agents',
            url: 'https://tile.dev'
          },
          {
            id: 'wegic-ai',
            name: 'Wegic.ai',
            useCase: 'Web builder, landing page builder',
            url: 'https://wegic.ai/'
          },
          {
            id: 'zoer-ai',
            name: 'Zoer.ai',
            useCase: 'Create blogs, landing pages & websites',
            url: 'https://zoer.ai/'
          }
        ]
      },
      {
        id: 'open-source-library',
        name: 'Open Source Library: Run apps locally',
        tools: [
          {
            id: 'developers-cloudflare',
            name: 'Developers.Cloudflare',
            useCase: 'AI Agents - Run machine learning models',
            url: 'https://developers.cloudflare.com/workers-ai/'
          },
          {
            id: 'lm-studio',
            name: 'LM STUDIO',
            useCase: 'Run LLM on local machine with your own docs. INSTALLED ON ZBOOK',
            url: 'https://lmstudio.ai/'
          },
          {
            id: 'ollama',
            name: 'Ollama',
            useCase: 'llama floating on a cloud - Cloud models are now available in Ollama. Chat & build with open models',
            url: 'https://ollama.com/'
          },
          {
            id: 'pinokio-computer',
            name: 'Pinokio.computer',
            useCase: 'Pinokio is a browser that lets you install, run, and manage ANY server application, locally.',
            url: 'https://pinokio.computer/'
          },
          {
            id: 'web-catalogue',
            name: 'WEB CATALOGUE',
            useCase: 'Manage apps & accounts. Turn desktop apps with WebCatalog Desktop—your all-in-one tool to manage apps and accounts. INSTALLED ON ZBOOK',
            url: 'https://webcatalog.io/en/desktop'
          }
        ]
      },
      {
        id: 'open-source-chinese',
        name: 'Open Source: Chinese APPS',
        tools: [
          {
            id: 'deepseek-chinese',
            name: 'Deepseek',
            useCase: 'MML/LLM (better and cheaper than ChatGPT)',
            url: 'https://www.deepseek.com/'
          },
          {
            id: 'gio-ai-chinese',
            name: 'GIO AI',
            useCase: 'Level up your social game with studio quality photos from the GIO app',
            url: 'https://gioapp.ai/'
          },
          {
            id: 'hunyuan-videoai-chinese',
            name: 'Hunyuan videoai',
            useCase: 'Hunyuan AI Video is a new, state of the art, AI Video Generator that creates high-quality videos from text descriptions. It\'s the most powerful open-source video generation model available.',
            url: 'https://hunyuanvideoai.com/'
          },
          {
            id: 'manus-chinese',
            name: 'Manus',
            useCase: 'Generate images, slides webpages, spreadsheets & more',
            url: 'https://manus.im/app'
          },
          {
            id: 'qwen3-chinese',
            name: 'Qwen3',
            useCase: 'MML open source model by Alibaba',
            url: 'https://qwen.ai/home'
          },
          {
            id: 'stepvideo-2tv-chinese',
            name: 'StepVideo 2TV (open source)',
            useCase: 'StepVideoT2V is a state-of-the-art text-to-video pre-trained model featuring 30 billion parameters, capable of generating videos up to 204 frames in length. Can be used for video generation and editing',
            url: 'https://stepvideot2v.com/'
          },
          {
            id: 'wan-2-5-chinese',
            name: 'Wan 2.5',
            useCase: 'Create professional, audio-synced videos from a single prompt. Wan 2.5 generates voice, music, and perfectly matched lip-sync in one pass.',
            url: 'https://www.wan-ai.co/wan-2-5'
          }
        ]
      },
      {
        id: 'course-generators',
        name: 'Course Generators | Authoring Tools',
        tools: [
          {
            id: 'coassemble',
            name: 'Coassemble',
            useCase: 'Course building platform',
            url: 'https://coassemble.com/',
            featured: true
          },
          {
            id: 'colossyan-course',
            name: 'Colossyan.com/',
            useCase: 'Video Generator. Turn PDFs, PowerPoints, and scripts into training videos narrated by interactive AI avatars. Available in 100+ languages. No editing skills required.',
            url: 'http://colossyan.com/'
          },
          {
            id: 'coursebox-ai',
            name: 'Coursebox.ai',
            useCase: 'Course building platform',
            url: 'www.coursebox.ai'
          },
          {
            id: 'coursefy-ai',
            name: 'Coursefy.ai',
            useCase: 'Course building platform',
            url: 'Coursefy.ai'
          },
          {
            id: 'curriki',
            name: 'Curriki',
            useCase: 'H5P alternative',
            url: 'https://www.currikistudio.org/'
          },
          {
            id: 'decktopus-ai',
            name: 'Decktopus ai',
            useCase: 'AI generated presentations',
            url: 'https://www.decktopus.com/',
            featured: true
          },
          {
            id: 'descript-course',
            name: 'Descript',
            useCase: 'Making how-to videos',
            url: 'http://descript.com/blog'
          },
          {
            id: 'drawkit',
            name: 'Drawkit',
            useCase: 'Image generators',
            url: 'https:// drawkit.com'
          },
          {
            id: 'everlearns',
            name: 'Everlearns',
            useCase: 'Course Generator - AI',
            url: 'https://everlearns.com/'
          },
          {
            id: 'fastercourse',
            name: 'Fastercourse',
            useCase: 'Articulate Rise 360',
            url: 'https://fastercourse.com/articulate-storyline-blocks-for-articulate-rise/'
          },
          {
            id: 'flowmapp',
            name: 'FlowMapp',
            useCase: 'create visual sitemaps, user flows, wireframes, and content briefs',
            url: 'https://www.flowmapp.com/'
          },
          {
            id: 'gemini-google-storybook-course',
            name: 'Gemini.google.com/gems/storybook',
            useCase: 'Gemini.google.com/gem/storybook',
            url: 'https://gemini.google.com/gem/storybook'
          },
          {
            id: 'genially',
            name: 'Genially',
            useCase: 'course building platform',
            url: 'https://app.genially.com/teams/'
          },
          {
            id: 'gravitywrite',
            name: 'GravityWrite',
            useCase: 'Assignment help',
            url: 'https://www.guidde.com/'
          },
          {
            id: 'guidde-com',
            name: 'Guidde.com/',
            useCase: 'Create How to guides, FAQs',
            url: 'https://www.guidde.com/'
          },
          {
            id: 'h5p',
            name: 'H5P',
            useCase: 'H5P free version',
            url: 'https://h5p.org/'
          },
          {
            id: 'h5p-commercial',
            name: 'H5P',
            useCase: 'H5P commercial version',
            url: '5P as a Service - H5P.com'
          },
          {
            id: 'inncivio',
            name: 'Inncivio',
            useCase: 'Course building platform',
            url: 'https://www.inncivio.com/pricing'
          },
          {
            id: 'learnyourway-course',
            name: 'Learn your way',
            useCase: 'LearnYourWay. Learn Your Way transforms content into a dynamic and engaging learning experience tailored for you.',
            url: 'https://learnyourway.withgoogle.com'
          },
          {
            id: 'notebooklm-course',
            name: 'NotebookLM',
            useCase: 'Transform static content into interactive learning',
            url: 'https://newsletter.ai-academy.com/p/transform-static-content-into-interactive-learning'
          },
          {
            id: 'openelms',
            name: 'Openelms',
            useCase: 'Course Generator - AI',
            url: 'https://openelms.ai/'
          },
          {
            id: 'proprofs-com',
            name: 'Proprofs.com',
            useCase: 'Course Generator - AI',
            url: 'http://www.proprofs.com/training/'
          },
          {
            id: 'studyfetch',
            name: 'Studyfetch.com',
            useCase: 'Create tutoring sessions, explainers, flash cards, tests and quizzes, from your course material in seconds.',
            url: 'https://www.studyfetch.com'
          },
          {
            id: 'tango-ai',
            name: 'Tango.ai',
            useCase: 'Create and share how-to guides in minutes',
            url: 'https://www.tango.ai/'
          },
          {
            id: 'tapybl',
            name: 'Tapybl',
            useCase: 'The easiest way to generate bite-sized learning for today\'s short attention spans. Simple to create. Engaging to learn.',
            url: 'https://tapybl.com/'
          },
          {
            id: 'teach-anything-course',
            name: 'Teach Anything',
            useCase: 'Teach you Anything in seconds',
            url: 'https://www.teach-anything.com/'
          },
          {
            id: 'veed-io-course',
            name: 'Veed.io',
            useCase: 'Create how-to videos with AI',
            url: 'https://www.veed.io/'
          },
          {
            id: 'you-learn-ai',
            name: 'You learn.ai',
            useCase: 'Turns your learning materials into notes, interactive chats, quizzes, and more',
            url: 'https://www.youlearn.ai/'
          }
        ]
      }
    ]
  }
];
