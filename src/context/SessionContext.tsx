import { createContext, useContext, useState, useEffect } from 'react'
import { Message } from './ChatContext'

export interface ChatSession {
  id: string
  title: string
  agentType: 'dev' | 'infra' | 'main'
  createdAt: string
  updatedAt: string
  messages: Message[]
  status: 'active' | 'archived' | 'completed'
}

interface SessionContextProps {
  sessions: ChatSession[]
  currentSession: ChatSession | null
  createSession: (agentType: 'dev' | 'infra' | 'main') => ChatSession
  selectSession: (id: string) => void
  updateSessionMessages: (id: string, messages: Message[]) => void
  deleteSession: (id: string) => void
  ensureSession: (agentType?: 'dev' | 'infra' | 'main') => ChatSession
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined)

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null)

  // ✅ localStorage 복원
  useEffect(() => {
    const stored = localStorage.getItem('chat_sessions')
    const storedCurrentId = localStorage.getItem('current_session_id')
    if (stored) {
      try {
        const parsed: ChatSession[] = JSON.parse(stored)
        setSessions(parsed)
        if (storedCurrentId) {
          const found = parsed.find(s => s.id === storedCurrentId)
          if (found) setCurrentSession(found)
        }
      } catch (e) {
        console.error('세션 복원 실패:', e)
      }
    }
  }, [])

  // ✅ 세션 변경 시 저장 (불필요 루프 방지)
  useEffect(() => {
    localStorage.setItem('chat_sessions', JSON.stringify(sessions))
    if (currentSession)
      localStorage.setItem('current_session_id', currentSession.id)
  }, [sessions, currentSession?.id])

  const createSession = (agentType: 'dev' | 'infra' | 'main'): ChatSession => {
    const newSession: ChatSession = {
      id: crypto.randomUUID(),
      title: `${agentType.toUpperCase()} Session #${sessions.length + 1}`,
      agentType,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [],
      status: 'active',
    }
    setSessions(prev => [...prev, newSession])
    setCurrentSession(newSession)
    return newSession
  }

  const ensureSession = (agentType: 'dev' | 'infra' | 'main' = 'main'): ChatSession => {
    if (currentSession) return currentSession
    return createSession(agentType)
  }

  const selectSession = (id: string) => {
    const found = sessions.find(s => s.id === id) || null
    setCurrentSession(found)
  }

  const updateSessionMessages = (id: string, messages: Message[]) => {
    setSessions(prev =>
      prev.map(s =>
        s.id === id ? { ...s, messages, updatedAt: new Date().toISOString() } : s
      )
    )
  }

  const deleteSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id))
    if (currentSession?.id === id) setCurrentSession(null)
  }

  return (
    <SessionContext.Provider
      value={{
        sessions,
        currentSession,
        createSession,
        selectSession,
        updateSessionMessages,
        deleteSession,
        ensureSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = () => {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error('useSession must be used within SessionProvider')
  return ctx
}
