// src/types/chat.ts
export interface Message {
  id: string
  role: 'user' | 'ai'
  content: string
  timestamp: string
  agentType: 'dev' | 'infra'
}

export interface ChatSession {
  id: string
  title: string
  agentType: 'dev' | 'infra'
  createdAt: string
  updatedAt: string
  messages: Message[]
  status: 'active' | 'archived' | 'completed'
}
