import { Message } from '../types/message'

export async function getAIResponse(input: string): Promise<Message> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        role: 'assistant',
        content: `“${input}”에 대한 답변은 현재 준비 중이에요 🤖`,
        timestamp: new Date().toISOString(),
      })
    }, 1000)
  })
}
