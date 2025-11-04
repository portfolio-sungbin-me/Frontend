// src/router/index.tsx
import { Routes, Route } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import Home from '../pages/Home'
import MainAgent from '../pages/MainAgent'
import Portfolio from '../pages/Portfolio'
import Profile from '../pages/Profile'
import NotFound from '../pages/NotFound'

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<MainAgent />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
