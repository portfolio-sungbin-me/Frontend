// src/pages/MainAgent.tsx
import { useState, useEffect, useRef } from 'react'
import { useChat } from '../context/ChatContext'
import { useSession } from '../context/SessionContext'
import { motion } from 'framer-motion'
import { Message } from '../types/chat'

export default function MainAgent() {
  const [input, setInput] = useState('')
  const { messages, addMessage, addQuestion } = useChat()
  const { currentSession, ensureSession } = useSession()
  const [isTyping, setIsTyping] = useState(false)
  const [typingText, setTypingText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping, typingText])

  const handleSend = async () => {
    if (!input.trim()) return

    const sess = ensureSession('main')  // ⬅️ 기본 세션 보장
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
      agentType: sess.agentType,
    }

    addMessage(userMsg)
    addQuestion(input)
    setInput('')
    setIsTyping(true)

    const fullResponse = `"${input}"에 대한 답변은 준비 중이에요 🤖`
    setTypingText('')

    setTimeout(() => {
      let index = 0
      const typingInterval = setInterval(() => {
        setTypingText(fullResponse.slice(0, index + 1))
        index++
        if (index === fullResponse.length) {
          clearInterval(typingInterval)
          const aiMsg: Message = {
            id: crypto.randomUUID(),
            role: 'ai',
            content: fullResponse,
            timestamp: new Date().toISOString(),
            agentType: sess.agentType,
          }
          addMessage(aiMsg)
          setIsTyping(false)
          setTypingText('')
        }
      }, 40)
    }, 600)
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 p-6 transition-colors">
      {!currentSession ? (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
          <p className="text-sm">현재 활성화된 세션이 없습니다.</p>
          <p className="text-xs mt-1">왼쪽 사이드바에서 새 세션을 추가하거나 메시지를 보내면 자동 생성됩니다.</p>
        </div>
      ) : (
        <>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
            {currentSession.title}
          </div>

          <div className="flex-1 overflow-y-auto space-y-5 mb-4">
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-sm transition ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-none border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="max-w-[80%] px-4 py-2 rounded-2xl text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                  {typingText || <span className="text-gray-400 text-xs">AI가 생각 중이에요...</span>}
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center border-t border-gray-200 dark:border-gray-700 pt-3">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="무엇이든 물어보세요..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            />
            <button
              onClick={handleSend}
              className="ml-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-full transition"
            >
              전송
            </button>
          </div>
        </>
      )}
    </div>
  )
}
