import { useEffect, useState } from 'react'
import { useAgent } from '../context/AgentContext'
import StatusBadge from './StatusBadge'
import { FiSun, FiMoon, FiCode, FiServer } from 'react-icons/fi'

type StatusType = 'connected' | 'warning' | 'disconnected'

export default function Header() {
  const [darkMode, setDarkMode] = useState(false)
  const [aiStatus, setAiStatus] = useState<StatusType>('connected')
  const [dbStatus, setDbStatus] = useState<StatusType>('connected')
  const [slackStatus, setSlackStatus] = useState<StatusType>('warning')
  const { activeAgent, setActiveAgent } = useAgent()

  // 🎯 상태 자동 갱신 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      const states: StatusType[] = ['connected', 'warning', 'disconnected']
      setAiStatus(states[Math.floor(Math.random() * 3)])
      setDbStatus(states[Math.floor(Math.random() * 3)])
      setSlackStatus(states[Math.floor(Math.random() * 3)])
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // 🌙 다크 모드 토글
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark')
    setDarkMode(!darkMode)
  }

  // 🧠 Agent 스타일 및 아이콘 매핑
  const isDev = activeAgent === 'dev'
  const agentColor = isDev ? 'blue' : 'gray'
  const agentIcon = isDev ? (
    <FiCode className="mr-1 text-blue-500" />
  ) : (
    <FiServer className="mr-1 text-gray-400" />
  )

  // 🟢 상태 점 색상
  const statusDotColor =
    aiStatus === 'connected'
      ? 'bg-green-500'
      : aiStatus === 'warning'
      ? 'bg-yellow-400'
      : 'bg-red-500'

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
      {/* 왼쪽 로고 / 타이틀 */}
      <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">Sungbin Cloud</h1>

      {/* 오른쪽 상태/테마/Agent 전환 */}
      <div className="flex items-center gap-6">
        {/* 🔹 Agent 선택 뱃지형 UI */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveAgent('dev')}
            className={`flex items-center gap-1 px-3 py-1.5 text-sm font-semibold rounded-full border transition-all ${
              isDev
                ? 'bg-blue-100 text-blue-700 border-blue-400 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-600'
                : 'bg-gray-50 text-gray-400 border-gray-200 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            🧠 Dev
          </button>

          <button
            onClick={() => setActiveAgent('infra')}
            className={`flex items-center gap-1 px-3 py-1.5 text-sm font-semibold rounded-full border transition-all ${
              !isDev
                ? 'bg-gray-200 text-gray-700 border-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'
                : 'bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100 hover:text-gray-600'
            }`}
          >
            ☁️ Infra
          </button>
        </div>

        {/* 상태 인디케이터 */}
        <div className="hidden md:flex items-center gap-3">
          <StatusBadge label="AI" status={aiStatus} message={`AI 상태: ${aiStatus}`} />
          <StatusBadge label="DB" status={dbStatus} message={`DB 연결: ${dbStatus}`} />
          <StatusBadge label="Slack" status={slackStatus} message={`Slack 응답: ${slackStatus}`} />
        </div>

        {/* 🧑 Agent 프로필 아바타 + 상태점 */}
        <div className="relative flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              isDev
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            }`}
          >
            {isDev ? 'D' : 'I'}
          </div>
          <span
            className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-gray-800 ${statusDotColor}`}
          ></span>
        </div>

        {/* 다크모드 토글 */}
        <button
          onClick={toggleTheme}
          className="ml-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? (
            <FiSun className="text-yellow-400" size={18} />
          ) : (
            <FiMoon className="text-gray-600 dark:text-gray-300" size={18} />
          )}
        </button>
      </div>
    </header>
  )
}
