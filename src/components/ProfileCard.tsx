import profile from '../data/profile.json'

export default function ProfileCard() {
  return (
    <aside className="bg-white shadow-md rounded-2xl p-6 w-80 flex flex-col items-center transition-all duration-300 hover:shadow-lg">
      {/* 🔽 프로필 이미지 */}
      <div className="relative mb-5 group">
        <img
          src={profile.avatar}
          alt={`${profile.name} profile`}
          className="w-40 h-40 rounded-full object-cover border-4 border-gray-200 shadow-sm transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* 🔽 이름 / 역할 */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-1">{profile.name}</h2>
      <p className="text-sm text-gray-500 mb-3">{profile.role}</p>

      {/* 🔽 자기소개 */}
      <p className="text-center text-gray-600 text-sm leading-relaxed mb-5">
        {profile.description}
      </p>

      {/* 🔽 기술 태그 */}
      <div className="flex flex-wrap justify-center gap-2">
        {profile.skills.map((skill) => (
          <span
            key={skill}
            className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-200 hover:bg-blue-100 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </aside>
  )
}
