export function Accordion({ id, topic, content, isActive, onClick, isFirst, isLast }) {
    return (
      <div className={`
        ${isFirst ? 'rounded-t-xl' : ''} 
        ${isLast ? 'rounded-b-xl' : ''}
        bg-white hover:bg-gray-50
      `}>
        <button
          className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors duration-150"
          onClick={onClick}
        >
          <h2 className="text-lg font-medium text-gray-900">{topic}</h2>
          <span 
            className={`text-gray-400 transition-transform duration-200 text-xl
                       ${isActive ? 'transform rotate-180' : ''}`}
          >
            ▼
          </span>
        </button>
        
        {isActive && (
          <div 
            id={id}
            className="px-6 pb-4 prose prose-sm max-w-none text-black"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </div>
    );
  }