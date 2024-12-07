import { Suspense } from 'react';
import { KnowledgeBaseWrapper } from '@/components/ontime/KnowledgeBase/KnowledgeBase';

export default function KnowledgeBasePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <KnowledgeBaseWrapper />
    </Suspense>
  );
}