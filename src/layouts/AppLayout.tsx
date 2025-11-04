// src/layouts/AppLayout.tsx
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* 왼쪽 Sidebar */}
      <Sidebar />

      {/* 오른쪽 메인 영역 */}
      <div className="flex flex-col flex-1">
        <Header />

        {/* 페이지별 내용 렌더링 */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet /> {/* ✅ 페이지(Home, Main 등)는 반드시 여기로 들어감 */}
        </main>
      </div>
    </div>
  )
}
