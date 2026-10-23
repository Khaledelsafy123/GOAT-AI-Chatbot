import { getMockResponse } from './mock-responses'
import type { Conversation } from './types'

const seed = (id: string, title: string, prompt: string, order: number): Conversation => ({
  id,
  title,
  updatedAt: order,
  messages: [
    { id: `${id}-u`, role: 'user', content: prompt, status: 'complete', createdAt: order },
    { id: `${id}-a`, role: 'assistant', content: getMockResponse(prompt), status: 'complete', createdAt: order },
  ],
})

export const SEED_CONVERSATIONS: Conversation[] = [
  seed('seed-1', 'Random forests vs gradient boosting', 'When should I use a random forest versus gradient boosting for classification?', 3),
  seed('seed-2', 'Gradient descent from scratch', 'Can you show me gradient descent from scratch with the math behind it?', 2),
  seed('seed-3', 'Vectorizing loops with NumPy', 'How do I speed up Python code with NumPy vectorization?', 1),
]
