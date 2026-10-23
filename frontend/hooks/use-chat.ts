
'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { deriveTitle } from '@/lib/chat/mock-responses'
import { SEED_CONVERSATIONS } from '@/lib/chat/seed'
import type { ChatSettings, Conversation, Message } from '@/lib/chat/types'

const API_URL = 'https://goat-murex.vercel.app/chat'
const STORAGE_KEY = 'goat-conversations-v1'
const ACTIVE_CHAT_KEY = 'goat-active-chat-v1'

const createId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`

export function useChat() {
  const [conversations, setConversations] =
    useState<Conversation[]>(SEED_CONVERSATIONS)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [settings, setSettings] = useState<ChatSettings>({
    streamResponses: true,
    simulateErrors: false,
  })
  const [pending, setPending] = useState<{
    conversationId: string
    messageId: string
  } | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const abortRef = useRef<AbortController | null>(null)

  // Restore conversations and the last active chat.
  useEffect(() => {
    try {
      const savedConversations = localStorage.getItem(STORAGE_KEY)

      if (savedConversations) {
        const parsed: unknown = JSON.parse(savedConversations)

        if (Array.isArray(parsed)) {
          setConversations(parsed as Conversation[])
        }
      }

      const savedActiveId = localStorage.getItem(ACTIVE_CHAT_KEY)

      if (savedActiveId) {
        setActiveId(savedActiveId)
      }
    } catch (error) {
      console.error('Could not load saved chat data:', error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Persist conversations after loading is complete.
  useEffect(() => {
    if (!isLoaded) return

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations))
    } catch (error) {
      console.error('Could not save conversations:', error)
    }
  }, [conversations, isLoaded])

  // Persist the active conversation.
  useEffect(() => {
    if (!isLoaded) return

    try {
      if (activeId) {
        localStorage.setItem(ACTIVE_CHAT_KEY, activeId)
      } else {
        localStorage.removeItem(ACTIVE_CHAT_KEY)
      }
    } catch (error) {
      console.error('Could not save active conversation:', error)
    }
  }, [activeId, isLoaded])

  const activeConversation =
    conversations.find((c) => c.id === activeId) ?? null

  const isBusy = pending !== null

  const updateMessage = useCallback(
    (
      conversationId: string,
      messageId: string,
      patch: (m: Message) => Partial<Message>,
    ) => {
      setConversations((prev) =>
        prev.map((c) =>
          c.id !== conversationId
            ? c
            : {
                ...c,
                updatedAt: Date.now(),
                messages: c.messages.map((m) =>
                  m.id === messageId ? { ...m, ...patch(m) } : m,
                ),
              },
        ),
      )
    },
    [],
  )

  const stop = useCallback(() => {
    abortRef.current?.abort()
    abortRef.current = null

    if (!pending) return

    updateMessage(pending.conversationId, pending.messageId, (m) =>
      m.content
        ? { status: 'complete' }
        : { status: 'complete', content: '_Response stopped._' },
    )

    setPending(null)
  }, [pending, updateMessage])

  const sendMessage = useCallback(
    async (text: string) => {
      const prompt = text.trim()
      if (!prompt || pending) return

      const now = Date.now()

      const userMessage: Message = {
        id: createId(),
        role: 'user',
        content: prompt,
        status: 'complete',
        createdAt: now,
      }

      const assistantMessage: Message = {
        id: createId(),
        role: 'assistant',
        content: '',
        status: 'streaming',
        createdAt: now,
      }

      let conversationId = activeId
      let previousMessages: Message[] = []

      if (conversationId) {
        const conversation = conversations.find(
          (c) => c.id === conversationId,
        )

        previousMessages = conversation?.messages ?? []

        setConversations((prev) =>
          prev.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  updatedAt: now,
                  messages: [...c.messages, userMessage, assistantMessage],
                }
              : c,
          ),
        )
      } else {
        conversationId = createId()

        const conversation: Conversation = {
          id: conversationId,
          title: deriveTitle(prompt),
          updatedAt: now,
          messages: [userMessage, assistantMessage],
        }

        setConversations((prev) => [conversation, ...prev])
        setActiveId(conversationId)
      }

      setPending({
        conversationId,
        messageId: assistantMessage.id,
      })

      const controller = new AbortController()
      abortRef.current = controller

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            message: prompt,
            history: previousMessages
              .filter(
                (m) => m.status === 'complete' && m.content.trim(),
              )
              .map((m) => ({
                role: m.role,
                content: m.content,
              })),
          }),
        })

        if (!response.ok) {
          throw new Error(`API request failed (${response.status})`)
        }

        const data: { reply?: string } = await response.json()

        if (!data.reply) {
          throw new Error('The AI returned an empty response.')
        }

        updateMessage(conversationId, assistantMessage.id, () => ({
          content: data.reply!,
          status: 'complete',
        }))
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return
        }

        updateMessage(conversationId, assistantMessage.id, () => ({
          content: 'Sorry, I couldn’t get a response. Please try again.',
          status: 'error',
        }))
      } finally {
        if (abortRef.current === controller) {
          abortRef.current = null
          setPending(null)
        }
      }
    },
    [activeId, conversations, pending, updateMessage],
  )

  const retry = useCallback(
    (messageId: string) => {
      if (!activeConversation || pending) return

      const index = activeConversation.messages.findIndex(
        (m) => m.id === messageId,
      )

      const prompt = activeConversation.messages
        .slice(0, index)
        .reverse()
        .find((m) => m.role === 'user')?.content

      if (!prompt) return

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConversation.id
            ? {
                ...c,
                messages: c.messages.filter((m) => m.id !== messageId),
              }
            : c,
        ),
      )

      void sendMessage(prompt)
    },
    [activeConversation, pending, sendMessage],
  )

  const newChat = useCallback(() => {
    stop()
    setActiveId(null)
  }, [stop])

  const selectConversation = useCallback(
    (id: string) => {
      if (id === activeId) return
      stop()
      setActiveId(id)
    },
    [activeId, stop],
  )

  const deleteConversation = useCallback(
    (id: string) => {
      if (pending?.conversationId === id) stop()

      setConversations((prev) => prev.filter((c) => c.id !== id))

      if (id === activeId) setActiveId(null)
    },
    [activeId, pending, stop],
  )

  const clearAll = useCallback(() => {
    stop()
    setConversations([])
    setActiveId(null)
  }, [stop])

  return {
    conversations,
    activeConversation,
    activeId,
    isBusy,
    settings,
    setSettings,
    sendMessage,
    retry,
    stop,
    newChat,
    selectConversation,
    deleteConversation,
    clearAll,
  }
}

export type UseChatReturn = ReturnType<typeof useChat>
