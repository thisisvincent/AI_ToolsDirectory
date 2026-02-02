


import { ProtectedRoute } from '@/components/ProtectedRoute';
import { NewReleasesBadge } from '@/components/NewReleasesBadge';

export default function DirectoryPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <section className="relative overflow-hidden bg-[#0f1729] py-32">
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
              The <span className="text-[#3b82f6]">Best</span> AI <span className="text-[#3b82f6]">Tools</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto drop-shadow-lg">
              AI-powered solutions for research, writing, academic excellence and media production
            </p>
          </div>
        </section>

        <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Research and Writing Tools Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-all hover:shadow-red-500/50 hover:shadow-2xl">
                <div className="mb-6">
                  <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Laptop */}
                    <rect x="25" y="20" width="50" height="35" fill="#e5e7eb" stroke="#374151" strokeWidth="2" rx="2"/>
                    <rect x="28" y="23" width="44" height="28" fill="#60a5fa" stroke="#374151" strokeWidth="1.5"/>
                    <line x1="32" y1="28" x2="68" y2="28" stroke="#374151" strokeWidth="1"/>
                    <line x1="32" y1="32" x2="68" y2="32" stroke="#374151" strokeWidth="1"/>
                    <line x1="32" y1="36" x2="60" y2="36" stroke="#374151" strokeWidth="1"/>
                    <rect x="20" y="55" width="60" height="3" fill="#9ca3af" stroke="#374151" strokeWidth="1.5" rx="1"/>
                    
                    {/* Open Book */}
                    <path d="M15 60 Q15 55 20 55 L30 55 Q35 55 35 60 L35 75 Q35 80 30 80 L20 80 Q15 80 15 75 Z" fill="white" stroke="#374151" strokeWidth="1.5"/>
                    <path d="M35 60 Q35 55 40 55 L50 55 Q55 55 55 60 L55 75 Q55 80 50 80 L40 80 Q35 80 35 75 Z" fill="white" stroke="#374151" strokeWidth="1.5"/>
                    <line x1="18" y1="63" x2="32" y2="63" stroke="#374151" strokeWidth="0.8"/>
                    <line x1="18" y1="67" x2="32" y2="67" stroke="#374151" strokeWidth="0.8"/>
                    <line x1="18" y1="71" x2="30" y2="71" stroke="#374151" strokeWidth="0.8"/>
                    <line x1="38" y1="63" x2="52" y2="63" stroke="#374151" strokeWidth="0.8"/>
                    <line x1="38" y1="67" x2="52" y2="67" stroke="#374151" strokeWidth="0.8"/>
                    <line x1="38" y1="71" x2="50" y2="71" stroke="#374151" strokeWidth="0.8"/>
                    
                    {/* Magnifying Glass */}
                    <circle cx="65" cy="70" r="8" fill="none" stroke="#374151" strokeWidth="2"/>
                    <line x1="71" y1="76" x2="77" y2="82" stroke="#374151" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="65" cy="70" r="5" fill="#fbbf24" opacity="0.3"/>
                    
                    {/* Pens/Pencils */}
                    <rect x="58" y="82" width="2" height="12" fill="#0f1729" stroke="#374151" strokeWidth="0.8" rx="0.5" transform="rotate(-25 59 88)"/>
                    <rect x="63" y="82" width="2" height="12" fill="#ef4444" stroke="#374151" strokeWidth="0.8" rx="0.5" transform="rotate(-15 64 88)"/>
                    <polygon points="58,82 59,82 58.5,79" fill="#374151"/>
                    <polygon points="63,82 64,82 63.5,79" fill="#374151"/>
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Research and Writing Tools
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 flex-1">
                  Tools for research, writing, and literature management
                </p>
                <a href="/research-writing" className="w-full">
                  <button className="w-full bg-[#0f1729] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#1a2942] transition-all">
                    Explore Tools
                  </button>
                </a>
              </div>

              {/* Academic AI Tools Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-all hover:shadow-red-500/50 hover:shadow-2xl">
                <div className="mb-6">
                  <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Stacked Books - Bottom to Top with colorful spines */}
                    {/* Book 1 - Orange */}
                    <rect x="25" y="70" width="50" height="8" fill="#fb923c" stroke="#374151" strokeWidth="1.5" rx="1"/>
                    <rect x="75" y="70" width="3" height="8" fill="#ea580c"/>
                    
                    {/* Book 2 - Blue */}
                    <rect x="28" y="60" width="44" height="8" fill="#0f1729" stroke="#374151" strokeWidth="1.5" rx="1"/>
                    <rect x="72" y="60" width="3" height="8" fill="#1d4ed8"/>
                    
                    {/* Book 3 - Pink/Red */}
                    <rect x="30" y="50" width="40" height="8" fill="#ec4899" stroke="#374151" strokeWidth="1.5" rx="1"/>
                    <rect x="70" y="50" width="3" height="8" fill="#be185d"/>
                    
                    {/* Book 4 - Green */}
                    <rect x="32" y="40" width="36" height="8" fill="#10b981" stroke="#374151" strokeWidth="1.5" rx="1"/>
                    <rect x="68" y="40" width="3" height="8" fill="#047857"/>
                    
                    {/* Graduation Cap on Top */}
                    {/* Cap Board */}
                    <path d="M35 35 L65 35 L68 38 L32 38 Z" fill="#1e40af" stroke="#374151" strokeWidth="1.5"/>
                    
                    {/* Cap Top (Mortarboard) */}
                    <rect x="20" y="30" width="60" height="3" fill="#0f1729" stroke="#374151" strokeWidth="1.5" rx="1"/>
                    
                    {/* Tassel */}
                    <line x1="75" y1="30" x2="75" y2="38" stroke="#10b981" strokeWidth="2"/>
                    <circle cx="75" cy="40" r="2.5" fill="#10b981"/>
                    
                    {/* Book Details - Pages */}
                    <line x1="27" y1="72" x2="27" y2="76" stroke="#fff" strokeWidth="0.5" opacity="0.5"/>
                    <line x1="30" y1="62" x2="30" y2="66" stroke="#fff" strokeWidth="0.5" opacity="0.5"/>
                    <line x1="32" y1="52" x2="32" y2="56" stroke="#fff" strokeWidth="0.5" opacity="0.5"/>
                    <line x1="34" y1="42" x2="34" y2="46" stroke="#fff" strokeWidth="0.5" opacity="0.5"/>
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Academic AI Tools
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 flex-1">
                  AI-powered tools for academic work and learning
                </p>
                <a href="/academic-ai" className="w-full">
                  <button className="w-full bg-[#0f1729] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#1a2942] transition-all">
                    Explore Tools
                  </button>
                </a>
              </div>

              {/* Tools by Use Case Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-all hover:shadow-red-500/50 hover:shadow-2xl relative">
                {/* New Releases Badge - Moved up by 5mm (approximately 19 pixels) */}
                <div className="absolute top-[119px] right-6 z-10">
                  <NewReleasesBadge />
                </div>
                
                <div className="mb-6">
                  <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="35" cy="35" r="12" fill="#9ca3af" stroke="#374151" strokeWidth="2"/>
                    <rect x="28" y="28" width="14" height="14" fill="white" stroke="#374151" strokeWidth="1.5"/>
                    <line x1="32" y1="35" x2="38" y2="35" stroke="#374151" strokeWidth="1.5"/>
                    <line x1="35" y1="32" x2="35" y2="38" stroke="#374151" strokeWidth="1.5"/>
                    
                    <path d="M55 25 L75 25 L75 45 L55 45 Z" fill="#fbbf24" stroke="#374151" strokeWidth="2"/>
                    <circle cx="65" cy="35" r="4" fill="white"/>
                    <rect x="58" y="38" width="14" height="2" fill="#374151"/>
                    
                    <path d="M25 55 L45 55 L35 75 Z" fill="#374151" stroke="#374151" strokeWidth="2"/>
                    <circle cx="35" cy="62" r="3" fill="#fbbf24"/>
                    
                    <rect x="55" y="55" width="20" height="20" fill="#9ca3af" stroke="#374151" strokeWidth="2" rx="2"/>
                    <path d="M60 65 L65 70 L75 60" stroke="#fbbf24" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Tools by Use Case
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 flex-1">
                  AI tools organized by specific applications
                </p>
                <a href="/tools-by-use-case" className="w-full">
                  <button className="w-full bg-[#0f1729] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#1a2942] transition-all">
                    Explore Tools
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}


