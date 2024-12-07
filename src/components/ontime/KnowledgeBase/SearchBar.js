// components/KnowledgeBase/SearchBar.js
'use client';

export function SearchBar({ onChange }) {
  return (
    <div className="mb-8">
      <input
        type="text"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        placeholder="Хайх..."
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}