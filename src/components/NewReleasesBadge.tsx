
'use client';

export function NewReleasesBadge() {
  return (
    <div className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300">
      <span className="text-white font-bold text-sm">+ New Releases</span>
    </div>
  );
}
