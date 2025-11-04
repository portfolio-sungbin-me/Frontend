import { motion } from 'framer-motion'

interface SectionCardProps {
  title: string
  items: { id: number; title: string; content?: string; date?: string }[]
}

export default function SectionCard({ title, items }: SectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5"
    >
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">{title}</h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="border-l-4 border-blue-500 pl-3">
            <p className="font-medium text-gray-800 dark:text-gray-100">{item.title}</p>
            {item.content && (
              <p className="text-sm text-gray-500 dark:text-gray-400 break-all">
                {item.content}
              </p>
            )}
            {item.date && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{item.date}</p>
            )}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
