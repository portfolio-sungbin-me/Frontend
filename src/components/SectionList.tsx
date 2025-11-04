import info from '../data/information.json'
import edu from '../data/education.json'
import cert from '../data/certification.json'
import exp from '../data/experience.json'
import SectionCard from './SectionCard'

export default function SectionList() {
  return (
    // ⬇️ mt-8 제거 (오른쪽 전체가 아래로 내려가던 원인)
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SectionCard category="information" title="Information" items={info} />
      <SectionCard category="education" title="Education" items={edu} />
      <SectionCard category="certification" title="Certification" items={cert} />
      <SectionCard category="experience" title="Experience" items={exp} />
    </div>
  )
}
