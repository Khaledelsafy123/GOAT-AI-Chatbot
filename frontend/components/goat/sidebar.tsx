
'use client'

import {
  MessageSquare,
  Plus,
  Search,
  Settings,
  Trash2,
  X,
} from 'lucide-react'
import type { Conversation } from '@/lib/chat/types'
import { cn } from '@/lib/utils'
import { Logo } from './logo'

interface SidebarProps {
  conversations: Conversation[]
  activeId: string | null
  onNewChat: () => void
  onSelect: (id: string) => void
  onDelete: (id: string) => void
  onOpenSettings: () => void
  searchOpen: boolean
  searchQuery: string
  onSearchQueryChange: (query: string) => void
  onCloseSearch: () => void
  hasSearchQuery: boolean
}

export function Sidebar({
  conversations,
  activeId,
  onNewChat,
  onSelect,
  onDelete,
  onOpenSettings,
  searchOpen,
  searchQuery,
  onSearchQueryChange,
  onCloseSearch,
  hasSearchQuery,
}: SidebarProps) {
  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 shrink-0 items-center px-5">
        <Logo />
        <span className="ml-2.5 rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
          Beta
        </span>
      </div>

      <div className="px-3">
        <button
          type="button"
          onClick={onNewChat}
          className="group flex w-full items-center gap-2.5 rounded-xl border border-sidebar-border bg-white/[0.03] px-3 py-2.5 text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:bg-primary/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <span className="flex size-5 items-center justify-center rounded-md bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Plus className="size-3.5" strokeWidth={2.5} />
          </span>
          New chat
        </button>
      </div>

      {searchOpen && (
        <div className="px-3 pt-4">
          <div className="flex items-center gap-2 rounded-xl border border-sidebar-border bg-white/[0.03] px-3 focus-within:border-primary/50">
            <Search className="size-4 shrink-0 text-muted-foreground" />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchQueryChange(event.target.value)}
              placeholder="Search chats..."
              aria-label="Search conversations"
              autoComplete="off"
              className="h-10 min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />

            <button
              type="button"
              onClick={onCloseSearch}
              aria-label="Close search"
              title="Close search"
              className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}

      <nav
        aria-label="Recent conversations"
        className="scrollbar-thin mt-6 flex-1 overflow-y-auto px-3 pb-4"
      >
        <h2 className="px-3 pb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
          {hasSearchQuery ? 'Search results' : 'Recent'}
        </h2>

        {conversations.length === 0 ? (
          <p className="px-3 py-3 text-sm leading-6 text-muted-foreground">
            {hasSearchQuery
              ? 'No matching conversations found.'
              : 'No conversations yet.'}
          </p>
        ) : (
          <ul className="flex flex-col gap-0.5">
            {conversations.map((conversation) => {
              const isActive = conversation.id === activeId

              return (
                <li key={conversation.id} className="group relative">
                  <button
                    type="button"
                    onClick={() => onSelect(conversation.id)}
                    aria-current={isActive ? 'page' : undefined}
                    title={conversation.title}
                    className={cn(
                      'flex w-full items-center gap-2.5 rounded-lg py-2 pl-3 pr-9 text-left text-sm transition-colors',
                      isActive
                        ? 'bg-sidebar-accent text-foreground'
                        : 'text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground',
                    )}
                  >
                    <MessageSquare
                      className={cn(
                        'size-4 shrink-0',
                        isActive
                          ? 'text-primary'
                          : 'text-muted-foreground/60',
                      )}
                    />
                    <span className="truncate">{conversation.title}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(conversation.id)}
                    aria-label={`Delete conversation: ${conversation.title}`}
                    title="Delete conversation"
                    className="absolute right-1.5 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground opacity-0 transition hover:bg-white/5 hover:text-destructive focus-visible:opacity-100 group-hover:opacity-100 max-md:opacity-100"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </nav>

      <div className="shrink-0 border-t border-sidebar-border p-3">
        <button
          type="button"
          onClick={onOpenSettings}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-foreground"
        >
          <Settings className="size-4" />
          Settings
        </button>

        <div className="mt-1 flex items-center gap-3 rounded-lg px-3 py-2">
          <span className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-slate-500 to-slate-700 text-[11px] font-semibold text-white">
            G
          </span>

          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-medium text-foreground">
              Guest learner
            </p>
            <p className="text-xs text-muted-foreground">Demo workspace</p>
          </div>
        </div>
      </div>
    </div>
  )
}
