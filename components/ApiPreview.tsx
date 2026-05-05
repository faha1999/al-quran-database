'use client';

import { useEffect, useState } from 'react';
import { Play, Check, Copy, Lock } from 'lucide-react';
import { isHostedApiDisabledHost } from '@/lib/site-config';

interface ApiPreviewProps {
  endpoint: string;
  method?: string;
  initialData?: unknown;
}

export default function ApiPreview({ endpoint, method = 'GET', initialData }: ApiPreviewProps) {
  const [data, setData] = useState<unknown>(initialData ?? null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isHostedSite, setIsHostedSite] = useState(false);
  const hasData = data !== null;

  useEffect(() => {
    setIsHostedSite(isHostedApiDisabledHost(window.location.hostname));
  }, []);

  const fetchData = async () => {
    if (isHostedSite) {
      setData({
        success: false,
        error:
          'Hosted API access is disabled on this domain. Run the repository locally or self-host it to execute this request.',
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(endpoint);
      const json = await res.json();
      setData(json);
    } catch {
      setData({ error: 'Failed to fetch data' });
    }
    setLoading(false);
  };

  const copyData = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-zinc-800 bg-zinc-900/50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-2">
          <span className="text-[10px] font-black text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded uppercase">
            {method}
          </span>
          <code className="truncate text-xs text-zinc-400">{endpoint}</code>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-xs font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            {isHostedSite ? (
              <Lock className="w-3 h-3" />
            ) : loading ? (
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Play className="w-3 h-3" />
            )}
            {isHostedSite ? 'Run Locally' : 'Run'}
          </button>
          {hasData ? (
            <button
              onClick={copyData}
              className="p-1.5 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400"
              title="Copy JSON"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-green-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          ) : null}
        </div>
      </div>
      <div className="p-4 max-h-[300px] overflow-y-auto font-mono text-[11px] leading-relaxed">
        {hasData ? (
          <pre className="text-blue-400">{JSON.stringify(data, null, 2)}</pre>
        ) : isHostedSite ? (
          <p className="text-zinc-500 italic">
            Hosted runtime previews are disabled on the official domain. Clone the repo or self-host
            this project to execute `{endpoint}`.
          </p>
        ) : (
          <p className="text-zinc-600 italic">Click &quot;Run&quot; to see live API response...</p>
        )}
      </div>
    </div>
  );
}
