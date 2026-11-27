import { ExternalLink } from 'lucide-react';
import type { ResearchArticle } from '../types/airQuality';

export interface ResearchArticleCardProps {
  paper: ResearchArticle;
  readJournalLabel: string;
}

/**
 * Displays a peer-reviewed academic study card with DOI deep-link and APA citation.
 */
export function ResearchArticleCard({ paper, readJournalLabel }: ResearchArticleCardProps) {
  return (
    <article className="p-6 rounded-3xl glass-card space-y-3 hover:shadow-md transition-shadow border border-zinc-200 dark:border-zinc-700">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-bold font-mono text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700">
            {paper.journal} • {paper.year}
          </span>
          <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-400/50">
            {paper.evidenceScore}
          </span>
        </div>
        <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
          DOI: {paper.doi}
        </span>
      </div>

      <h3 className="text-lg font-bold text-zinc-950 dark:text-white tracking-tight">
        {paper.title}
      </h3>

      <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
        Authors: {paper.authors}
      </p>

      <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed bg-zinc-100 dark:bg-zinc-800/80 p-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-700">
        <strong className="text-zinc-950 dark:text-white">Core Clinical Finding:</strong>{' '}
        {paper.keyTakeaway}
      </p>

      <div className="flex flex-wrap items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-700/80 text-xs text-zinc-500 dark:text-zinc-400">
        <span className="italic">{paper.citationApa}</span>
        <a
          href={`https://doi.org/${paper.doi}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-bold mt-1 sm:mt-0"
        >
          <span>{readJournalLabel}</span>
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
