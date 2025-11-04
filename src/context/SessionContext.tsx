// src/context/SessionContext.tsx
import { createContext, useContext, useState, useEffect } from 'react'
import { Message, ChatSession } from '../types/chat'

interface SessionContextProps {
  sessions: ChatSession[]
  currentSession: ChatSession | null
  createSession: (agentType: 'dev' | 'infra') => void
  selectSession: (id: string) => void
  updateSessionMessages: (id: string, messages: Message[]) => void
  deleteSession: (id: string) => void
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined)

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null)

  // ✅ localStorage 복원
  useEffect(() => {
    const storedSessions = localStorage.getItem('chat_sessions')
    const storedCurrentId = localStorage.getItem('current_session_id')

    if (storedSessions) {
      try {
        const parsed: ChatSession[] = JSON.parse(storedSessions)
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

  // ✅ 세션 변경 시 저장
  useEffect(() => {
    localStorage.setItem('chat_sessions', JSON.stringify(sessions))
    if (currentSession) localStorage.setItem('current_session_id', currentSession.id)
    else localStorage.removeItem('current_session_id')
  }, [sessions, currentSession])

  const createSession = (agentType: 'dev' | 'infra') => {
    const newSession: ChatSession = {
      id: crypto.randomUUID(),
      title: `${agentType === 'dev' ? '🧠 Dev' : '☁️ Infra'} Session #${sessions.length + 1}`,
      agentType,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [],
      status: 'active',
    }
    setSessions([...sessions, newSession])
    setCurrentSession(newSession)
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
    if (currentSession?.id === id) {
      setCurrentSession(null)
      localStorage.removeItem('current_session_id')
    }
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
