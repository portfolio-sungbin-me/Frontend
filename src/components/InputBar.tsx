import { useState } from 'react'
import { FiMic } from 'react-icons/fi'

interface InputBarProps {
  onSend: (input: string) => void
}

export default function InputBar({ onSend }: InputBarProps) {
  const [input, setInput] = useState('')

  const handleSubmit = () => {
    if (!input.trim()) return
    onSend(input)
    setInput('')
  }

  return (
    <div className="p-4 border-t bg-white">
      <div className="relative flex items-center w-full max-w-3xl mx-auto bg-white border border-gray-300 rounded-full shadow-sm px-5 py-3 hover:shadow-md transition">
        <input
          type="text"
          placeholder="무엇이든 물어보세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          className="flex-1 bg-transparent outline-none text-gray-800 text-sm md:text-base"
        />
        <button
          className="text-gray-500 hover:text-blue-600 transition"
          title="음성 인식 (준비 중)"
        >
          <FiMic size={20} />
        </button>
      </div>
    </div>
  )
}
