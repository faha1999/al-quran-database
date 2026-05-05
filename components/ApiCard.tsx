interface ApiCardProps {
  method: string;
  path: string;
  description: string;
}

export default function ApiCard({ method, path, description }: ApiCardProps) {
  return (
    <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 hover:border-blue-500/50 transition-all group">
      <div className="flex items-center gap-3 mb-4">
        <span className="px-2 py-0.5 bg-blue-500/10 text-blue-500 text-[10px] font-black rounded border border-blue-500/20 uppercase">
          {method}
        </span>
        <code className="text-zinc-200 font-mono text-sm group-hover:text-blue-400 transition-colors">
          {path}
        </code>
      </div>
      <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
