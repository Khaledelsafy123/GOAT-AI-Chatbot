'use client'

import { ArrowUp, Square } from 'lucide-react'
import { useLayoutEffect, type KeyboardEvent, type RefObject } from 'react'
import { cn } from '@/lib/utils'

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  onStop: () => void
  isBusy: boolean
  textareaRef: RefObject<HTMLTextAreaElement | null>
}

const MAX_HEIGHT_PX = 200

export function ChatInput({ value, onChange, onSubmit, onStop, isBusy, textareaRef }: ChatInputProps) {
  const canSend = value.trim().length > 0 && !isBusy

  useLayoutEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, MAX_HEIGHT_PX)}px`
  }, [value, textareaRef])

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter' || event.shiftKey) return
    if (event.nativeEvent.isComposing || event.keyCode === 229) return
    event.preventDefault()
    if (canSend) onSubmit()
  }

  return (
    <div className="px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 sm:px-6">
      <form
        onSubmit={(event) => {
          event.preventDefault()
          if (canSend) onSubmit()
        }}
        className="mx-auto w-full max-w-3xl"
      >
        <div className="group relative rounded-2xl border border-border bg-card/80 shadow-[0_8px_40px_-12px_oklch(0_0_0/0.6)] backdrop-blur-xl transition-colors focus-within:border-primary/40 focus-within:shadow-[0_0_0_4px_oklch(0.68_0.16_252/0.08),0_8px_40px_-12px_oklch(0_0_0/0.6)]">
          <label htmlFor="chat-input" className="sr-only">
            Message GOAT
          </label>
          <textarea
            id="chat-input"
            ref={textareaRef}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Ask about ML, deep learning, or Python…"
            className="scrollbar-thin block max-h-[200px] w-full resize-none bg-transparent py-4 pl-4 pr-16 text-[15px] leading-6 text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
          />
          <div className="absolute bottom-2.5 right-2.5">
            {isBusy ? (
              <button
                type="button"
                onClick={onStop}
                aria-label="Stop generating"
                className="flex size-9 items-center justify-center rounded-xl bg-foreground text-background transition-transform hover:scale-105 active:scale-95"
              >
                <Square className="size-3.5 fill-current" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!canSend}
                aria-label="Send message"
                className={cn(
                  'flex size-9 items-center justify-center rounded-xl transition-all',
                  canSend
                    ? 'bg-primary text-primary-foreground shadow-[0_4px_16px_-4px_oklch(0.68_0.16_252/0.7)] hover:scale-105 active:scale-95'
                    : 'bg-white/[0.06] text-muted-foreground/50',
                )}
              >
                <ArrowUp className="size-4" strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>
        <p className="mt-2.5 text-center text-xs text-muted-foreground/60">
          GOAT runs in demo mode with simulated responses.{' '}
          <span className="hidden sm:inline">Press Shift + Enter for a new line.</span>
        </p>
      </form>
    </div>
  )
}
