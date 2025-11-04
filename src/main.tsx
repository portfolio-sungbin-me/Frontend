// Tailwind 전역 스타일 (없으면 화면이 “깨져 보임”)
import './index.css'

// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from './context/ThemeContext'
import { AgentProvider } from './context/AgentContext'
import { SessionProvider } from './context/SessionContext' // ✅ Chat보다 위로
import { ChatProvider } from './context/ChatContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AgentProvider>
          <SessionProvider>   {/* ✅ 먼저 감쌈 */}
            <ChatProvider>     {/* ✅ 안쪽에 위치 */}
              <App />
            </ChatProvider>
          </SessionProvider>
        </AgentProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
