import { ArrowUpRight } from 'lucide-react'
import { SUGGESTIONS, type Suggestion } from '@/lib/chat/suggestions'
import { MascotLogo } from './logo'

interface WelcomeScreenProps {
  onSelectSuggestion: (prompt: string) => void
}

export function WelcomeScreen({ onSelectSuggestion }: WelcomeScreenProps) {
  return (
    <div className="scrollbar-thin flex-1 overflow-y-auto">
      <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col items-center justify-center px-4 py-10 sm:px-6">
        <div className="animate-fade-up">
          <MascotLogo priority className="h-28 rounded-2xl sm:h-36" />
        </div>
        <h1
          className="mt-6 animate-fade-up text-balance text-center text-4xl font-semibold tracking-tight text-foreground [animation-delay:60ms] sm:text-5xl"
        >
  GOAT
  </h1>
        <p className="mt-4 max-w-md animate-fade-up text-pretty text-center text-base leading-relaxed text-muted-foreground [animation-delay:120ms]">
          Your personal assistant for Machine Learning, Deep Learning, and Python.
        </p>

        <ul className="mt-10 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
          {SUGGESTIONS.map((suggestion, index) => (
            <li
              key={suggestion.title}
              className="animate-fade-up"
              style={{ animationDelay: `${180 + index * 60}ms` }}
            >
              <SuggestionCard suggestion={suggestion} onSelect={onSelectSuggestion} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function SuggestionCard({
  suggestion,
  onSelect,
}: {
  suggestion: Suggestion
  onSelect: (prompt: string) => void
}) {
  const Icon = suggestion.icon
  return (
    <button
      type="button"
      onClick={() => onSelect(suggestion.prompt)}
      className="group relative flex h-full w-full items-start gap-4 overflow-hidden rounded-2xl border border-border bg-card/50 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_0%_0%,oklch(0.68_0.16_252/0.12),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
        <Icon className="size-5" strokeWidth={1.75} />
      </span>
      <span className="relative min-w-0 flex-1">
        <span className="block text-sm font-medium text-foreground">{suggestion.title}</span>
        <span className="mt-1 block text-sm leading-snug text-muted-foreground">{suggestion.description}</span>
      </span>
      <ArrowUpRight className="relative size-4 shrink-0 text-muted-foreground/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
    </button>
  )
}
