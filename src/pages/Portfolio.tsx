import { useAgent } from '../context/AgentContext'
import SectionCard from '../components/SectionCard'

// Dev 데이터
import devInfo from '../data/dev/information.json'
import devExp from '../data/dev/experience.json'
import devEdu from '../data/dev/education.json'
import devCert from '../data/dev/certification.json'

// Infra 데이터
import infraInfo from '../data/infra/information.json'
import infraExp from '../data/infra/experience.json'
import infraEdu from '../data/infra/education.json'
import infraCert from '../data/infra/certification.json'

export default function Portfolio() {
  const { activeAgent } = useAgent()

  // Agent에 따른 데이터 분기
  const info = activeAgent === 'dev' ? devInfo : infraInfo
  const exp = activeAgent === 'dev' ? devExp : infraExp
  const edu = activeAgent === 'dev' ? devEdu : infraEdu
  const cert = activeAgent === 'dev' ? devCert : infraCert

  return (
    <div className="min-h-full p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
      {/* 제목 및 설명 */}
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">
          {activeAgent === 'dev' ? 'Developer Portfolio' : 'Infrastructure Portfolio'}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          {activeAgent === 'dev'
            ? '개발 프로젝트 및 코드 품질 중심의 이력입니다.'
            : '클라우드 인프라 구축 및 자동화 중심의 이력입니다.'}
        </p>
      </header>

      {/* 섹션 카드 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="🧑‍💻 Information" items={info} />
        <SectionCard title="🏢 Experience" items={exp} />
        <SectionCard title="🎓 Education" items={edu} />
        <SectionCard title="📜 Certification" items={cert} />
      </div>
    </div>
  )
}
