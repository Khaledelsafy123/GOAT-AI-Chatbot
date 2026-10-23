'use client'

import { AlertCircle, RotateCcw } from 'lucide-react'
import type { Message } from '@/lib/chat/types'
import { CopyButton } from './copy-button'
import { Wordmark } from './logo'
import { Markdown } from './markdown'

interface ChatMessageProps {
  message: Message
  isLast: boolean
  canRetry: boolean
  onRetry: (id: string) => void
}

export function ChatMessage({ message, isLast, canRetry, onRetry }: ChatMessageProps) {
  if (message.role === 'user') {
    return (
      <div className="flex animate-fade-up justify-end">
        <div className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-md border border-primary/15 bg-gradient-to-b from-primary/[0.16] to-primary/[0.1] px-4 py-2.5 text-[15px] leading-7 text-foreground sm:max-w-[75%]">
          {message.content}
        </div>
      </div>
    )
  }

  const isThinking = message.status === 'streaming' && message.content === ''
  const isStreaming = message.status === 'streaming' && !isThinking

  return (
    <div className="flex animate-fade-up">
      <div className="min-w-0 flex-1">
        <p className="sr-only">GOAT said:</p>
        <Wordmark title="" className="mb-3 h-2.5 opacity-80" />
        {isThinking && <ThinkingIndicator />}
        {message.status === 'error' && (
          <ErrorNotice onRetry={() => onRetry(message.id)} disabled={!canRetry} />
        )}
        {message.content && (
          <div aria-live={isStreaming ? 'polite' : undefined}>
            <Markdown content={message.content} />
            {isStreaming && (
              <span
                aria-hidden="true"
                className="ml-0.5 inline-block h-4 w-[3px] translate-y-0.5 animate-blink rounded-full bg-primary"
              />
            )}
          </div>
        )}
        {message.status === 'complete' && message.content && (
          <div className="mt-3 flex items-center gap-1 text-muted-foreground">
            <CopyButton value={message.content} label="Copy response" />
            {isLast && (
              <button
                type="button"
                onClick={() => onRetry(message.id)}
                disabled={!canRetry}
                aria-label="Regenerate response"
                className="inline-flex items-center rounded-md px-1.5 py-1 text-xs transition-colors hover:bg-white/5 hover:text-foreground disabled:opacity-40"
              >
                <RotateCcw className="size-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function ThinkingIndicator() {
  return (
    <div role="status" className="flex h-7 items-center gap-3">
      <span className="flex items-center gap-1" aria-hidden="true">
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="size-1.5 animate-bounce rounded-full bg-primary"
            style={{ animationDelay: `${delay}ms`, animationDuration: '1s' }}
          />
        ))}
      </span>
      <span className="text-sm text-muted-foreground">Thinking…</span>
    </div>
  )
}

function ErrorNotice({ onRetry, disabled }: { onRetry: () => void; disabled: boolean }) {
  return (
    <div
      role="alert"
      className="flex flex-col gap-3 rounded-xl border border-destructive/25 bg-destructive/[0.07] p-4 sm:flex-row sm:items-center"
    >
      <div className="flex flex-1 items-start gap-3">
        <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
        <div>
          <p className="text-sm font-medium text-foreground">Something went wrong</p>
          <p className="mt-0.5 text-sm text-muted-foreground">GOAT couldn&apos;t generate a response. Please try again.</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onRetry}
        disabled={disabled}
        className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-border bg-white/[0.04] px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.08] disabled:opacity-50 sm:self-auto"
      >
        <RotateCcw className="size-3.5" />
        Retry
      </button>
    </div>
  )
}
