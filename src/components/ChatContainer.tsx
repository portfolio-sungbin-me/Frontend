import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Message } from '../types/message'

interface ChatContainerProps {
  messages: Message[]
  loading: boolean
}

export default function ChatContainer({ messages, loading }: ChatContainerProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  // 새 메시지 추가 시 자동 스크롤
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  return (
    <div className="flex-1 overflow-y-auto flex flex-col items-center p-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 transition">
      <div className="w-full max-w-[700px] space-y-6">
        {/* 안내문 */}
        {messages.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
            <p className="text-lg font-medium">AI Agent와 대화를 시작해보세요!</p>
            <p className="text-sm text-gray-500 mt-2">아래 입력창에 질문을 입력하면 됩니다.</p>
          </div>
        )}

        {/* 메시지 렌더링 */}
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-2xl text-sm md:text-base shadow-sm leading-relaxed break-words ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white self-end'
                  : 'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100'
              }`}
              style={{
                maxWidth: '75%',
                wordBreak: 'break-word',
              }}
            >
              <div>{msg.content}</div>
              {msg.timestamp && (
                <p
                  className={`text-[11px] opacity-70 hover:opacity-100 mt-1 ${
                    msg.role === 'user'
                      ? 'text-blue-200 text-right'
                      : 'text-gray-500 dark:text-gray-400 text-right'
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              )}
            </div>
          </motion.div>
        ))}

        {/* 로딩 표시 */}
        {loading && (
          <p className="text-sm text-gray-400 text-center mt-4 animate-pulse">
            🤖 응답 생성 중...
          </p>
        )}

        {/* 하단 스크롤 고정용 */}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
