// src/components/sidebar/Sidebar.tsx
import { Link, useLocation } from 'react-router-dom'
import { useChat } from '../context/ChatContext'
import { useSession } from '../context/SessionContext'
import { useAgent } from '../context/AgentContext'

export default function Sidebar() {
  const location = useLocation()
  const { recentQuestions, loadChat } = useChat()
  const { sessions, currentSession, selectSession, createSession, deleteSession } = useSession()
  const { activeAgent } = useAgent()

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/main', label: 'Agent' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/profile', label: 'Profile' },
  ]

  return (
    <aside className="w-60 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col justify-between">
      <div>
        <div className="p-4 text-lg font-bold text-gray-800 dark:text-gray-100">
          Sungbin Cloud
        </div>

        {/* ⚡ 빠른 바로가기 */}
        <nav className="px-3 mb-4">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-3 py-2 rounded-md text-sm transition ${
                location.pathname === item.path
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 🧠 최근 질문 */}
        <div className="px-3 mb-4">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">🧠 최근 질문</p>
          <ul className="space-y-1 max-h-40 overflow-y-auto">
            {recentQuestions.length > 0 ? (
              recentQuestions.map((q, i) => (
                <li
                  key={i}
                  onClick={() => loadChat(q)}
                  className="cursor-pointer px-2 py-1 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 truncate"
                >
                  {q}
                </li>
              ))
            ) : (
              <p className="text-gray-400 text-xs px-2">아직 질문이 없습니다.</p>
            )}
          </ul>
        </div>

        {/* 💬 최근 대화 (세션) */}
        <div className="px-3 mb-4 border-t border-gray-200 dark:border-gray-700 pt-3">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">💬 최근 대화</p>
            <button
              onClick={() => createSession(activeAgent)}
              className="text-xs text-blue-500 hover:text-blue-400"
            >
              + 새 세션
            </button>
          </div>

          <div className="space-y-1 max-h-40 overflow-y-auto">
            {sessions.length === 0 ? (
              <p className="text-gray-400 text-xs px-2">아직 대화 세션이 없습니다.</p>
            ) : (
              sessions.map(session => (
                <div
                  key={session.id}
                  className={`group cursor-pointer px-2 py-1 rounded-md text-sm flex justify-between items-center transition-all truncate ${
                    currentSession?.id === session.id
                      ? 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-100'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => selectSession(session.id)}
                >
                  <span className="truncate">{session.title}</span>
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      deleteSession(session.id)
                    }}
                    className="opacity-0 group-hover:opacity-100 text-xs text-red-500 hover:text-red-400 transition"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}
