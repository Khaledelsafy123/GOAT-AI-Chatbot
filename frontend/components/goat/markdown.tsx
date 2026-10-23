'use client'

import {
  isValidElement,
  memo,
  type ReactElement,
  type ReactNode,
} from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import { CopyButton } from './copy-button'

const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩'

function toArabicDigits(text: string): string {
  return text.replace(/[0-9]/g, (digit) => ARABIC_DIGITS[Number(digit)])
}

function extractText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map(extractText).join('')
  }

  if (isValidElement(node)) {
    return extractText(
      (node.props as { children?: ReactNode }).children,
    )
  }

  return ''
}

function CodeBlock({ children }: { children: ReactNode }) {
  const codeElement = isValidElement(children)
    ? (children as ReactElement<{ className?: string }>)
    : null

  const language =
    codeElement?.props.className?.replace('language-', '') ?? 'text'

  const code = extractText(children).replace(/\n$/, '')

  return (
    <div
      dir="ltr"
      className="my-5 overflow-hidden rounded-xl border border-border bg-[oklch(0.115_0.006_260)]"
    >
      <div className="flex items-center justify-between border-b border-border bg-white/[0.02] px-4 py-2">
        <span className="font-mono text-xs text-muted-foreground">
          {language}
        </span>

        <CopyButton value={code} label="Copy code" showLabel />
      </div>

      <pre className="scrollbar-thin overflow-x-auto p-4 text-left font-mono text-[13px] leading-relaxed text-[oklch(0.88_0.03_245)]">
        {children}
      </pre>
    </div>
  )
}

const components: Components = {
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,

  code: ({ className, children }) =>
    className ? (
      <code dir="ltr" className={className}>
        {children}
      </code>
    ) : (
      <code
        dir="ltr"
        className="rounded-md border border-border bg-white/[0.05] px-1.5 py-0.5 font-mono text-[0.85em] text-[oklch(0.82_0.1_245)]"
      >
        {children}
      </code>
    ),

  h1: ({ children }) => (
    <h3
      dir="auto"
      className="mb-3 mt-6 text-start text-lg font-semibold text-foreground first:mt-0"
    >
      {children}
    </h3>
  ),

  h2: ({ children }) => (
    <h3
      dir="auto"
      className="mb-3 mt-6 text-start text-lg font-semibold text-foreground first:mt-0"
    >
      {children}
    </h3>
  ),

  h3: ({ children }) => (
    <h4
      dir="auto"
      className="mb-2 mt-6 text-start text-base font-semibold text-foreground first:mt-0"
    >
      {children}
    </h4>
  ),

  p: ({ children }) => (
    <p
      dir="auto"
      className="my-3 text-start leading-7 first:mt-0 last:mb-0"
    >
      {children}
    </p>
  ),

  ul: ({ children }) => (
    <ul
      dir="auto"
      className="my-3 flex list-disc flex-col gap-1.5 ps-5 text-start marker:text-primary/70"
    >
      {children}
    </ul>
  ),

  ol: ({ children }) => (
    <ol
      dir="auto"
      className="my-3 flex list-decimal flex-col gap-1.5 ps-5 text-start marker:text-muted-foreground"
    >
      {children}
    </ol>
  ),

  li: ({ children }) => (
    <li dir="auto" className="ps-1 text-start leading-7">
      {children}
    </li>
  ),

  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">
      {children}
    </strong>
  ),

  blockquote: ({ children }) => (
    <blockquote
      dir="auto"
      className="my-4 rounded-lg border-s-2 border-primary/60 bg-primary/[0.06] px-4 py-2 text-start text-foreground/90 [&>p]:my-0"
    >
      {children}
    </blockquote>
  ),

  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-primary underline underline-offset-4"
    >
      {children}
    </a>
  ),

  table: ({ children }) => (
    <div className="my-5 w-full overflow-x-auto rounded-xl border border-white/15">
      <table className="w-full min-w-[600px] border-collapse text-start">
        {children}
      </table>
    </div>
  ),

  thead: ({ children }) => (
    <thead className="bg-white/[0.06]">{children}</thead>
  ),

  th: ({ children }) => (
    <th className="border-b-2 border-white/20 px-4 py-3 text-start text-sm font-semibold text-foreground">
      {children}
    </th>
  ),

  td: ({ children }) => (
    <td className="border-b border-white/10 px-4 py-3 text-start align-top text-sm leading-6">
      {children}
    </td>
  ),

  tr: ({ children }) => (
    <tr className="even:bg-white/[0.025]">{children}</tr>
  ),
}

function normalizeMath(content: string): string {
  const protectedParts: string[] = []

  const protect = (value: string) => {
    const index = protectedParts.length
    protectedParts.push(value)
    return `\u0000MATH_PROTECTED_${index}\u0000`
  }

  let normalized = content.replace(
    /(^|\n)[ \t]*(```|~~~)[^\n]*\n[\s\S]*?\n[ \t]*\2[ \t]*(?=\n|$)/g,
    (block) => protect(block),
  )

  normalized = normalized.replace(
    /\\\[([\s\S]*?)\\\]/g,
    (_match, equation: string) => `\n$$\n${equation.trim()}\n$$\n`,
  )

  normalized = normalized.replace(
    /\\\(([\s\S]*?)\\\)/g,
    (_match, equation: string) => `$${equation.trim()}$`,
  )

  normalized = normalized.replace(
    /\u0000MATH_PROTECTED_(\d+)\u0000/g,
    (_match, index: string) => protectedParts[Number(index)],
  )

  return normalized
}

function localizeArabicProse(content: string): string {
  const protectedParts: string[] = []
  let text = content

  const protect = (pattern: RegExp) => {
    text = text.replace(pattern, (match) => {
      const index = protectedParts.length
      protectedParts.push(match)
      return `\u0000PROTECTED_${index}\u0000`
    })
  }

  protect(
    /(^|\n)[ \t]*(?:```|~~~)[^\n]*\n[\s\S]*?\n[ \t]*(?:```|~~~)[ \t]*(?=\n|$)/g,
  )

  protect(/\$\$[\s\S]*?\$\$/g)
  protect(/\\\[[\s\S]*?\\\]/g)
  protect(/\\\([\s\S]*?\\\)/g)
  protect(/(?<!\$)\$(?!\$)[^\n$]+\$(?!\$)/g)
  protect(/`[^`\n]*`/g)

  text = text.replace(/[^\u0000]+/g, (segment) => {
    if (/[\u0600-\u06FF]/.test(segment)) {
      return toArabicDigits(segment)
    }

    return segment
  })

  text = text.replace(
    /\u0000PROTECTED_(\d+)\u0000/g,
    (_match, index: string) => protectedParts[Number(index)],
  )

  return text
}

export const Markdown = memo(function Markdown({
  content,
}: {
  content: string
}) {
  const normalizedContent = normalizeMath(content)
  const localizedContent = localizeArabicProse(normalizedContent)

  return (
    <div
      dir="auto"
      className="text-start text-[15px] text-foreground/85"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={components}
      >
        {localizedContent}
      </ReactMarkdown>
    </div>
  )
})