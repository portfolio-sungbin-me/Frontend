export async function saveChatToDB(messages: any[], recentQuestions: string[]) {
  try {
    const response = await fetch('/api/chat/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, recentQuestions }),
    })

    if (!response.ok) throw new Error('Failed to save chat data')

    const result = await response.json()
    console.log('Chat saved successfully:', result)
  } catch (error) {
    console.error('Error saving chat to DB:', error)
  }
}
