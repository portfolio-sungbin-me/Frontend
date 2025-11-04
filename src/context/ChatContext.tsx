import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useSession } from './SessionContext'

export interface Message {
  id: string
  role: 'user' | 'ai'
  content: string
  timestamp: string
  agentType: 'dev' | 'infra' | 'main'
}

interface ChatContextType {
  messages: Message[]
  setMessages: (msgs: Message[]) => void
  addMessage: (msg: Message) => void
  recentQuestions: string[]
  addQuestion: (question: string) => void
  loadChat: (question: string) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
  const { currentSession, updateSessionMessages } = useSession()
  const [messages, setMessages] = useState<Message[]>([])
  const [recentQuestions, setRecentQuestions] = useState<string[]>(() => {
    const saved = localStorage.getItem('recent_questions')
    return saved ? JSON.parse(saved) : []
  })

  // ✅ 세션이 바뀌면 그 세션의 메시지로 교체
  useEffect(() => {
    if (!currentSession) {
      setMessages([])
      return
    }
    // ✅ JSON 비교로 불필요한 루프 방지
    const isChanged =
      JSON.stringify(currentSession.messages || []) !== JSON.stringify(messages)
    if (isChanged) setMessages(currentSession.messages || [])
  }, [currentSession])

  // ✅ 메시지가 바뀌면 세션에도 자동 반영 (조건부)
  useEffect(() => {
    if (!currentSession) return
    const isDifferent =
      JSON.stringify(currentSession.messages) !== JSON.stringify(messages)
    if (isDifferent) {
      updateSessionMessages(currentSession.id, messages)
    }
  }, [messages])

  // ✅ 최근 질문 localStorage 저장
  useEffect(() => {
    localStorage.setItem('recent_questions', JSON.stringify(recentQuestions))
  }, [recentQuestions])

  const addMessage = (msg: Message) => {
    setMessages(prev => [...prev, msg])
  }

  const addQuestion = (question: string) => {
    setRecentQuestions(prev =>
      prev.includes(question) ? prev : [question, ...prev].slice(0, 10)
    )
  }

  const loadChat = (question: string) => {
    const newMsgs: Message[] = [
      {
        id: crypto.randomUUID(),
        role: 'user',
        content: question,
        timestamp: new Date().toISOString(),
        agentType: currentSession?.agentType || 'main',
      },
      {
        id: crypto.randomUUID(),
        role: 'ai',
        content: `"${question}"에 대한 이전 답변을 복원했습니다.`,
        timestamp: new Date().toISOString(),
        agentType: currentSession?.agentType || 'main',
      },
    ]
    setMessages(newMsgs)
  }

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        addMessage,
        recentQuestions,
        addQuestion,
        loadChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (!context) throw new Error('useChat must be used within a ChatProvider')
  return context
}
