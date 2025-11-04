import { createContext, useContext, useState, ReactNode } from 'react'

type AgentType = 'dev' | 'infra'

interface AgentContextType {
  activeAgent: AgentType
  setActiveAgent: (agent: AgentType) => void
}

const AgentContext = createContext<AgentContextType | undefined>(undefined)

export function AgentProvider({ children }: { children: ReactNode }) {
  const [activeAgent, setActiveAgent] = useState<AgentType>('infra')
  return (
    <AgentContext.Provider value={{ activeAgent, setActiveAgent }}>
      {children}
    </AgentContext.Provider>
  )
}

export function useAgent() {
  const context = useContext(AgentContext)
  if (!context) throw new Error('useAgent must be used within AgentProvider')
  return context
}
