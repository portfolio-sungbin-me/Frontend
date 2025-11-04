import { useState } from 'react'
import { FiMic } from 'react-icons/fi'

export default function Home() {
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    alert(`입력된 질문: ${input}`)
    setInput('')
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
      {/* 중앙 문구 */}
      <h2 className="text-2xl md:text-3xl font-semibold mb-10 tracking-tight">
        저에 대해서 궁금한 질문이 있다면 <br className="md:hidden" /> 무엇이든 질문해보세요!!
      </h2>

      {/* 입력창 */}
      <div className="relative flex items-center w-full max-w-2xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full shadow-sm px-5 py-3 hover:shadow-md transition">
        <input
          type="text"
          placeholder="무엇이든 물어보세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-transparent outline-none text-gray-800 dark:text-gray-100 text-sm md:text-base"
        />
        <button
          className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
          title="음성 인식 (준비 중)"
        >
          <FiMic size={20} />
        </button>
      </div>

      {/* 하단 안내 문구 */}
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-8">
        AI Agent는 이성빈의 포트폴리오 기반 데이터에 연결됩니다.
      </p>
    </div>
  )
}
