export interface Message {
  id: string
  role: 'user' | 'ai'
  content: string
  timestamp: string
  agentType: 'main' | 'dev' | 'infra'   // ✅ main 추가
}

export interface ChatSession {
  id: string
  title: string
  agentType: 'main' | 'dev' | 'infra'   // ✅ main 추가
  createdAt: string
  updatedAt: string
  messages: Message[]
  status: 'active' | 'archived' | 'completed'
}
