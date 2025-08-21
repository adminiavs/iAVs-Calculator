
import React from 'react';

interface AdviceSectionProps {
  onGetAdvice: () => void;
  isLoading: boolean;
  advice: string;
  error: string | null;
}

// A simple markdown-to-HTML parser for the advice text.
const SimpleMarkdown: React.FC<{ text: string }> = ({ text }) => {
  const content = text
    .split('\n')
    .map((line, index) => {
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-semibold text-cyan-300 mt-4 mb-2">{line.substring(4)}</h3>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-bold text-cyan-400 mt-6 mb-3">{line.substring(3)}</h2>;
      }
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-bold text-cyan-500 mt-8 mb-4">{line.substring(2)}</h1>;
      }
      if (line.startsWith('* ') || line.startsWith('- ')) {
        return <li key={index} className="ml-5 list-disc">{line.substring(2)}</li>;
      }
       if (line.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index} className="text-slate-300 leading-relaxed text-base">{line}</p>;
    })
    // Group list items
    .reduce((acc: React.ReactNode[], curr) => {
      const last = acc[acc.length - 1];
      if (React.isValidElement(last) && last.type === 'ul' && React.isValidElement(curr) && curr.type === 'li') {
        const newUl = React.cloneElement(last, {}, [...React.Children.toArray(last.props.children), curr]);
        acc[acc.length - 1] = newUl;
      } else if (React.isValidElement(curr) && curr.type === 'li') {
        acc.push(<ul key={acc.length} className="space-y-2 my-3">{curr}</ul>);
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);

  return <div className="prose prose-invert">{content}</div>;
};

const LoadingSpinner = () => (
  <div className="flex items-center justify-center gap-3 text-slate-300">
    <svg className="animate-spin h-6 w-6 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <span className="text-lg">Generating expert advice...</span>
  </div>
);

export default function AdviceSection({ onGetAdvice, isLoading, advice, error }: AdviceSectionProps): React.ReactNode {
  return (
    <div className="flex flex-col gap-4 mt-auto pt-6 border-t border-slate-700">
      <h3 className="text-2xl font-semibold text-white text-center">AI Build Guide</h3>
      <button
        onClick={onGetAdvice}
        disabled={isLoading}
        className="w-full bg-gradient-to-b from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-bold py-3.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/10 transform hover:scale-105 text-lg"
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11.982 2.022a.75.75 0 00-1.065.06l-8.5 9.5a.75.75 0 00-.223.518c.002.32.124.621.348.845l.006.006a3.5 3.5 0 004.95 0l2.05-2.05a.75.75 0 00-1.06-1.06l-2.05 2.05a2 2 0 01-2.828-2.828l6.01-6.01a2 2 0 012.828 0l1.414 1.414a2 2 0 010 2.828l-3.56 3.56a.75.75 0 001.06 1.06l3.56-3.56a3.5 3.5 0 000-4.95l-1.414-1.414a3.5 3.5 0 00-4.89-.06l-1.474 1.656a.75.75 0 001.12.998l1.474-1.656a2 2 0 012.794.034L11.982 2.022z" />
            </svg>
            Generate Build Advice
          </>
        )}
      </button>

      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert">
          <p>{error}</p>
        </div>
      )}

      {advice && (
        <div className="mt-2 bg-slate-900/70 p-4 rounded-lg border border-slate-700 max-h-72 overflow-y-auto">
          <SimpleMarkdown text={advice} />
        </div>
      )}
    </div>
  );
}
