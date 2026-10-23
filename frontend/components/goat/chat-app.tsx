
'use client'

import {
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  SquarePen,
} from 'lucide-react'
import { useRef, useState } from 'react'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { useChat } from '@/hooks/use-chat'
import { ChatInput } from './chat-input'
import { Logo } from './logo'
import { MessageList } from './message-list'
import { SettingsDialog } from './settings-dialog'
import { Sidebar } from './sidebar'
import { WelcomeScreen } from './welcome-screen'

export function ChatApp() {
  const chat = useChat()

  const [input, setInput] = useState('')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const focusInput = () =>
    requestAnimationFrame(() => textareaRef.current?.focus())

  const handleSubmit = () => {
    if (!input.trim() || chat.isBusy) return

    chat.sendMessage(input)
    setInput('')
  }

  const handleNewChat = () => {
    chat.newChat()
    setInput('')
    setSearchQuery('')
    setMobileNavOpen(false)
    focusInput()
  }

  const handleSelect = (id: string) => {
    chat.selectConversation(id)
    setMobileNavOpen(false)
  }

  const handleSuggestion = (prompt: string) => {
    setInput(prompt)
    focusInput()
  }

  const handleToggleSearch = () => {
    const opening = !searchOpen

    setSearchOpen(opening)

    if (opening) {
      setSidebarCollapsed(false)
      setMobileNavOpen(true)
    } else {
      setSearchQuery('')
    }
  }

  const handleToggleSidebar = () => {
    setSidebarCollapsed((collapsed) => !collapsed)
    setSearchOpen(false)
    setSearchQuery('')
  }

  const normalizedQuery = searchQuery.trim().toLocaleLowerCase()

  const filteredConversations = normalizedQuery
    ? chat.conversations.filter((conversation) => {
        const titleMatches = conversation.title
          .toLocaleLowerCase()
          .includes(normalizedQuery)

        const messageMatches = conversation.messages.some((message) =>
          message.content.toLocaleLowerCase().includes(normalizedQuery),
        )

        return titleMatches || messageMatches
      })
    : chat.conversations

  const sidebar = (
    <Sidebar
      conversations={filteredConversations}
      activeId={chat.activeId}
      onNewChat={handleNewChat}
      onSelect={handleSelect}
      onDelete={chat.deleteConversation}
      onOpenSettings={() => {
        setMobileNavOpen(false)
        setSettingsOpen(true)
      }}
      searchOpen={searchOpen}
      searchQuery={searchQuery}
      onSearchQueryChange={setSearchQuery}
      onCloseSearch={() => {
        setSearchOpen(false)
        setSearchQuery('')
      }}
      hasSearchQuery={Boolean(normalizedQuery)}
    />
  )

  const messages = chat.activeConversation?.messages ?? []

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <aside
        className={`hidden shrink-0 overflow-hidden border-r border-sidebar-border transition-[width] duration-200 md:block ${
          sidebarCollapsed ? 'w-0 border-r-0' : 'w-[280px]'
        }`}
        aria-hidden={sidebarCollapsed}
      >
        {!sidebarCollapsed && sidebar}
      </aside>

      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent
          side="left"
          className="w-[85%] max-w-[300px] gap-0 border-sidebar-border p-0"
          showCloseButton={false}
        >
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          {sidebar}
        </SheetContent>
      </Sheet>

      <main className="relative flex min-w-0 flex-1 flex-col">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(60%_60%_at_50%_0%,oklch(0.55_0.18_255/0.14),transparent_70%)]"
        />

        <header className="relative z-10 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border/60 px-3 sm:px-5 md:border-transparent">
          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open navigation"
              title="Open sidebar"
              className="flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground md:hidden"
            >
              <Menu className="size-5" />
            </button>

            <button
              type="button"
              onClick={handleToggleSidebar}
              aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className="hidden size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground md:flex"
            >
              {sidebarCollapsed ? (
                <PanelLeftOpen className="size-5" />
              ) : (
                <PanelLeftClose className="size-5" />
              )}
            </button>

            <Logo className="md:hidden" />

            <h2 className="hidden min-w-0 truncate text-sm font-medium text-muted-foreground md:block">
              {chat.activeConversation?.title ?? 'New conversation'}
            </h2>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={handleToggleSearch}
              aria-label={searchOpen ? 'Close chat search' : 'Search chats'}
              title={searchOpen ? 'Close search' : 'Search chats'}
              aria-pressed={searchOpen}
              className={`flex size-9 items-center justify-center rounded-lg transition-colors hover:bg-white/5 hover:text-foreground ${
                searchOpen
                  ? 'bg-white/10 text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              <Search className="size-[18px]" />
            </button>

            <span className="hidden items-center gap-1.5 rounded-full border border-border bg-white/[0.03] px-2.5 py-1 text-xs text-muted-foreground sm:inline-flex">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              GOAT · Demo
            </span>

            <button
              type="button"
              onClick={handleNewChat}
              aria-label="New chat"
              title="New chat"
              className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground md:hidden"
            >
              <SquarePen className="size-[18px]" />
            </button>
          </div>
        </header>

        <div className="relative z-0 flex min-h-0 flex-1 flex-col">
          {chat.activeConversation && messages.length > 0 ? (
            <MessageList
              conversationId={chat.activeConversation.id}
              messages={messages}
              isBusy={chat.isBusy}
              onRetry={chat.retry}
            />
          ) : (
            <WelcomeScreen onSelectSuggestion={handleSuggestion} />
          )}

          <ChatInput
            value={input}
            onChange={setInput}
            onSubmit={handleSubmit}
            onStop={chat.stop}
            isBusy={chat.isBusy}
            textareaRef={textareaRef}
          />
        </div>
      </main>

      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        settings={chat.settings}
        onSettingsChange={chat.setSettings}
        onClearAll={chat.clearAll}
        conversationCount={chat.conversations.length}
      />
    </div>
  )
}
