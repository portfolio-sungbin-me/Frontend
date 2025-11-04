import { useAgent } from '../context/AgentContext'
import devSkills from '../data/dev/skills.json'
import infraSkills from '../data/infra/skills.json'
import devTools from '../data/dev/tools.json'
import infraTools from '../data/infra/tools.json'

export default function Profile() {
  const { activeAgent } = useAgent()
  const skills = activeAgent === 'dev' ? devSkills : infraSkills
  const tools = activeAgent === 'dev' ? devTools : infraTools

  return (
    <div className="min-h-full p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors space-y-10">
      {/* 페이지 헤더 */}
      <header>
        <h1 className="text-2xl font-semibold">
          {activeAgent === 'dev' ? 'Developer Profile' : 'Infra Engineer Profile'}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          {activeAgent === 'dev'
            ? '프론트엔드와 백엔드 개발, 자동화 도구 중심의 기술 스택'
            : '클라우드 인프라, IaC, 관측성 중심의 기술 스택'}
        </p>
      </header>

      {/* Skills */}
      <section>
        <h2 className="text-xl font-semibold mb-3">🧠 Skills</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {skills.map((s) => (
            <div
              key={s.id}
              className="flex flex-col items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 shadow-sm hover:shadow-md transition"
            >
              <img src={s.icon} alt={s.name} className="w-10 h-10 mb-2 object-contain" />
              <p className="text-sm text-gray-800 dark:text-gray-200">{s.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section>
        <h2 className="text-xl font-semibold mb-3">⚙️ Tools & Platforms</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {tools.map((t) => (
            <div
              key={t.id}
              className="flex flex-col items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 shadow-sm hover:shadow-md transition"
            >
              <img src={t.icon} alt={t.name} className="w-10 h-10 mb-2 object-contain" />
              <p className="text-sm text-gray-800 dark:text-gray-200">{t.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
