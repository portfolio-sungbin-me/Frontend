// src/types/message.ts
export interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp?: string
}
