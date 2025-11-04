import { Message } from '../types/message'

// 임시 DB Mock (콘솔 출력)
export async function saveChatLog(message: Message): Promise<boolean> {
  console.log(`[DB MOCK] 저장됨 → ${message.role}: ${message.content}`)
  return true
}
