'use client'

import { isValidElement, memo, type ReactElement, type ReactNode } from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CopyButton } from './copy-button'

function extractText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (isValidElement(node)) return extractText((node.props as { children?: ReactNode }).children)
  return ''
}

function CodeBlock({ children }: { children: ReactNode }) {
  const codeElement = isValidElement(children) ? (children as ReactElement<{ className?: string }>) : null
  const language = codeElement?.props.className?.replace('language-', '') ?? 'text'
  const code = extractText(children).replace(/\n$/, '')

  return (
    <div className="my-5 overflow-hidden rounded-xl border border-border bg-[oklch(0.115_0.006_260)]">
      <div className="flex items-center justify-between border-b border-border bg-white/[0.02] px-4 py-2">
        <span className="font-mono text-xs text-muted-foreground">{language}</span>
        <CopyButton value={code} label="Copy code" showLabel />
      </div>
      <pre className="scrollbar-thin overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-[oklch(0.88_0.03_245)]">
        {children}
      </pre>
    </div>
  )
}

const components: Components = {
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
  code: ({ className, children }) =>
    className ? (
      <code className={className}>{children}</code>
    ) : (
      <code className="rounded-md border border-border bg-white/[0.05] px-1.5 py-0.5 font-mono text-[0.85em] text-[oklch(0.82_0.1_245)]">
        {children}
      </code>
    ),
  h1: ({ children }) => <h3 className="mb-3 mt-6 text-lg font-semibold text-foreground first:mt-0">{children}</h3>,
  h2: ({ children }) => <h3 className="mb-3 mt-6 text-lg font-semibold text-foreground first:mt-0">{children}</h3>,
  h3: ({ children }) => <h4 className="mb-2 mt-6 text-base font-semibold text-foreground first:mt-0">{children}</h4>,
  p: ({ children }) => <p className="my-3 leading-7 first:mt-0 last:mb-0">{children}</p>,
  ul: ({ children }) => <ul className="my-3 flex list-disc flex-col gap-1.5 pl-5 marker:text-primary/70">{children}</ul>,
  ol: ({ children }) => (
    <ol className="my-3 flex list-decimal flex-col gap-1.5 pl-5 marker:text-muted-foreground">{children}</ol>
  ),
  li: ({ children }) => <li className="pl-1 leading-7">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  blockquote: ({ children }) => (
    <blockquote className="my-4 rounded-r-lg border-l-2 border-primary/60 bg-primary/[0.06] py-2 pl-4 pr-3 text-foreground/90 [&>p]:my-0">
      {children}
    </blockquote>
  ),
  a: ({ children, href }) => (
    <a href={href} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4">
      {children}
    </a>
  ),
}

export const Markdown = memo(function Markdown({ content }: { content: string }) {
  return (
    <div className="text-[15px] text-foreground/85">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
})
