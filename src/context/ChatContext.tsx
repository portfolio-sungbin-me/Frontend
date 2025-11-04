import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useSession } from './SessionContext'
import { Message } from '../types/chat' // ✅ 타입 위치 통일

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

  // ✅ 세션이 변경되면 해당 세션 메시지 로드
  useEffect(() => {
    if (!currentSession) {
      setMessages([])
      return
    }
    setMessages(currentSession.messages || [])
  }, [currentSession])

  // ✅ 메시지가 바뀌면 세션 업데이트 (보호조건 추가)
  useEffect(() => {
    if (currentSession && Array.isArray(messages)) {
      updateSessionMessages(currentSession.id, messages)
    }
  }, [messages, currentSession])

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
    if (!currentSession) return
    const newMsgs: Message[] = [
      {
        id: crypto.randomUUID(),
        role: 'user',
        content: question,
        timestamp: new Date().toISOString(),
        agentType: currentSession.agentType,
      },
      {
        id: crypto.randomUUID(),
        role: 'ai',
        content: `"${question}"에 대한 이전 답변을 복원했습니다.`,
        timestamp: new Date().toISOString(),
        agentType: currentSession.agentType,
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
