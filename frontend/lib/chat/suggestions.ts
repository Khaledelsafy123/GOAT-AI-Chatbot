import { BrainCircuit, Code2, Network, Sigma, type LucideIcon } from 'lucide-react'

export interface Suggestion {
  title: string
  description: string
  prompt: string
  icon: LucideIcon
}

export const SUGGESTIONS: Suggestion[] = [
  {
    title: 'Machine Learning Algorithms',
    description: 'Compare models and know when to use each',
    prompt: 'Explain the most important machine learning algorithms and when I should use each one.',
    icon: BrainCircuit,
  },
  {
    title: 'Python for AI',
    description: 'The essential libraries and habits',
    prompt: 'What Python libraries should I learn for AI, and in what order?',
    icon: Code2,
  },
  {
    title: 'Mathematics for ML',
    description: 'Linear algebra, calculus, and probability',
    prompt: 'What mathematics do I need for machine learning, with a practical example?',
    icon: Sigma,
  },
  {
    title: 'Deep Learning Fundamentals',
    description: 'Neural networks from first principles',
    prompt: 'Teach me deep learning fundamentals: how do neural networks actually learn?',
    icon: Network,
  },
]
