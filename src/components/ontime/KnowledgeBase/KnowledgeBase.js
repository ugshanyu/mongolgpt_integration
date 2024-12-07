'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchBar } from './SearchBar';
import { Accordion } from './Accordion';
import { KNOWLEDGE_BASE } from './KNOWLEDGE_BASE';

// Create a wrapper component that uses useSearchParams
export function KnowledgeBaseWrapper() {
  const searchParams = useSearchParams();
  return <KnowledgeBase searchParams={searchParams} />;
}

// Main component that receives searchParams as a prop
export function KnowledgeBase({ searchParams }) {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTopics, setFilteredTopics] = useState(KNOWLEDGE_BASE);

  useEffect(() => {
    const topic = searchParams.get('topic');
    if (topic && KNOWLEDGE_BASE[topic]) {
      setActiveAccordion(topic);
      const element = document.getElementById(topic);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredTopics(KNOWLEDGE_BASE);
      return;
    }

    const filtered = Object.entries(KNOWLEDGE_BASE).reduce((acc, [key, value]) => {
      const searchLower = searchTerm.toLowerCase();
      const matchTitle = value.title.toLowerCase().includes(searchLower);
      const matchContent = value.content.toLowerCase().includes(searchLower);
      
      if (matchTitle || matchContent) {
        acc[key] = value;
      }
      return acc;
    }, {});
    
    setFilteredTopics(filtered);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ONTIME ХӨТӨЧ
          </h1>
          <p className="text-lg text-gray-600">
            Түгээмэл асуултууд болон тусламжийн мэдээлэл
          </p>
        </div>

        {/* Search Section */}
        <SearchBar onChange={setSearchTerm} />

        {/* Content Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-200">
            {Object.entries(filteredTopics).map(([key, value], index) => (
              <Accordion
                key={key}
                id={key}
                topic={value.title}
                content={value.content}
                isActive={activeAccordion === key}
                onClick={() => setActiveAccordion(activeAccordion === key ? null : key)}
                isFirst={index === 0}
                isLast={index === Object.entries(filteredTopics).length - 1}
              />
            ))}
          </div>
        </div>

        {/* No Results Message */}
        {Object.keys(filteredTopics).length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Хайлтын илэрц олдсонгүй
          </div>
        )}

        {/* Footer Section */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Нэмэлт тусламж шаардлагатай бол 7777-3444 дугаарт холбогдоно уу
        </div>
      </div>
    </div>
  );
}

export default KnowledgeBase;