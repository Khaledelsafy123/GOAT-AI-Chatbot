'use client'

import { ArrowDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Message } from '@/lib/chat/types'
import { cn } from '@/lib/utils'
import { ChatMessage } from './chat-message'

interface MessageListProps {
  conversationId: string
  messages: Message[]
  isBusy: boolean
  onRetry: (id: string) => void
}

const STICK_THRESHOLD_PX = 120

export function MessageList({ conversationId, messages, isBusy, onRetry }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isAtBottom, setIsAtBottom] = useState(true)
  const isAtBottomRef = useRef(true)

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior })
  }

  useEffect(() => {
    isAtBottomRef.current = true
    setIsAtBottom(true)
    scrollToBottom('instant')
  }, [conversationId])

  const lastMessage = messages[messages.length - 1]
  useEffect(() => {
    if (isAtBottomRef.current) scrollToBottom('instant')
  }, [messages.length, lastMessage?.content])

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < STICK_THRESHOLD_PX
    isAtBottomRef.current = atBottom
    setIsAtBottom(atBottom)
  }

  return (
    <div className="relative min-h-0 flex-1">
      <div ref={scrollRef} onScroll={handleScroll} className="scrollbar-thin h-full overflow-y-auto">
        <div role="log" aria-label="Conversation" className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8 sm:px-6">
          {messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              message={message}
              isLast={index === messages.length - 1}
              canRetry={!isBusy}
              onRetry={onRetry}
            />
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => scrollToBottom()}
        aria-label="Scroll to latest message"
        tabIndex={isAtBottom ? -1 : 0}
        className={cn(
          'absolute bottom-4 left-1/2 flex size-9 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-card/90 text-muted-foreground shadow-lg backdrop-blur transition-all hover:text-foreground',
          isAtBottom ? 'pointer-events-none translate-y-2 opacity-0' : 'opacity-100',
        )}
      >
        <ArrowDown className="size-4" />
      </button>
    </div>
  )
}
