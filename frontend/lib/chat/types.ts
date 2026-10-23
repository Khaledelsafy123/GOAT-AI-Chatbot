export type Role = 'user' | 'assistant'

export type MessageStatus = 'complete' | 'streaming' | 'error'

export interface Message {
  id: string
  role: Role
  content: string
  status: MessageStatus
  createdAt: number
}

export interface Conversation {
  id: string
  title: string
  messages: Message[]
  updatedAt: number
}

export interface ChatSettings {
  streamResponses: boolean
  simulateErrors: boolean
}
