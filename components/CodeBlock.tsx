import React from 'react';
import { Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = 'bash' }: CodeBlockProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="relative group">
      <pre className="bg-black border border-zinc-800 rounded-xl p-4 overflow-x-auto text-sm font-mono text-zinc-300">
        <code>{code}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute right-3 top-3 p-2 bg-zinc-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-700"
        title="Copy code"
      >
        <Copy className="w-4 h-4 text-zinc-400" />
      </button>
    </div>
  );
}
