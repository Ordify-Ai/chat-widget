import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styled from 'styled-components'

interface MarkdownRendererProps {
  content: string
  className?: string
}

// SSR-safe wrapper to prevent document access during server-side rendering
const SSRMarkdownRenderer = ({ content, className }: MarkdownRendererProps) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // During SSR, render plain text to avoid document access
  if (!isClient) {
    return (
      <MarkdownContainer className={className}>
        {content}
      </MarkdownContainer>
    )
  }

  // Client-side rendering with full markdown support
  return (
    <MarkdownContainer className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <StyledP>{children}</StyledP>,
          strong: ({ children }) => <StyledStrong>{children}</StyledStrong>,
          em: ({ children }) => <StyledEm>{children}</StyledEm>,
          code: ({ children, className }) => {
            const isInline = !className
            return <StyledCode $isInline={isInline}>{children}</StyledCode>
          },
          pre: ({ children }) => <StyledPre>{children}</StyledPre>,
          ul: ({ children }) => <StyledUl>{children}</StyledUl>,
          ol: ({ children }) => <StyledOl>{children}</StyledOl>,
          li: ({ children }) => <StyledLi>{children}</StyledLi>,
          blockquote: ({ children }) => <StyledBlockquote>{children}</StyledBlockquote>,
          h1: ({ children }) => <StyledH1>{children}</StyledH1>,
          h2: ({ children }) => <StyledH2>{children}</StyledH2>,
          h3: ({ children }) => <StyledH3>{children}</StyledH3>,
          h4: ({ children }) => <StyledH4>{children}</StyledH4>,
          h5: ({ children }) => <StyledH5>{children}</StyledH5>,
          h6: ({ children }) => <StyledH6>{children}</StyledH6>,
          hr: () => <StyledHr />,
          a: ({ children, href }) => (
            <StyledA href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </StyledA>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </MarkdownContainer>
  )
}

const MarkdownContainer = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  line-height: 1.6;
  color: #111827;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
`

const StyledP = styled.p`
  margin-bottom: 12px;
  line-height: 1.6;

  &:last-child {
    margin-bottom: 0;
  }
`

const StyledStrong = styled.strong`
  font-weight: 600;
  color: #111827;

  @media (prefers-color-scheme: dark) {
    color: #ffffff;
    font-weight: 700;
  }
`

const StyledEm = styled.em`
  font-style: italic;
  color: #374151;

  @media (prefers-color-scheme: dark) {
    color: #d1d5db;
  }
`

const StyledCode = styled.code<{ $isInline: boolean }>`
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  font-size: 14px;
  background: #f3f4f6;
  color: #1f2937;
  padding: ${props => props.$isInline ? '2px 6px' : '12px'};
  border-radius: ${props => props.$isInline ? '4px' : '6px'};
  display: ${props => props.$isInline ? 'inline' : 'block'};
  overflow-x: auto;
  margin-bottom: ${props => props.$isInline ? '0' : '12px'};

  @media (prefers-color-scheme: dark) {
    background: #374151;
    color: #f9fafb;
  }
`

const StyledPre = styled.pre`
  background: #f3f4f6;
  padding: 12px;
  border-radius: 6px;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  font-size: 14px;
  color: #1f2937;
  overflow-x: auto;
  margin-bottom: 12px;

  @media (prefers-color-scheme: dark) {
    background: #374151;
    color: #f9fafb;
  }
`

const StyledUl = styled.ul`
  list-style-type: disc;
  list-style-position: inside;
  margin-bottom: 12px;
  margin-left: 8px;

  li {
    margin-bottom: 4px;
  }
`

const StyledOl = styled.ol`
  list-style-type: decimal;
  list-style-position: inside;
  margin-bottom: 12px;
  margin-left: 8px;

  li {
    margin-bottom: 4px;
  }
`

const StyledLi = styled.li`
  line-height: 1.6;
`

const StyledBlockquote = styled.blockquote`
  border-left: 4px solid #3b82f6;
  padding-left: 16px;
  font-style: italic;
  margin-bottom: 12px;
  color: #374151;
  background: #eff6ff;
  padding: 8px 16px;
  border-radius: 0 6px 6px 0;

  @media (prefers-color-scheme: dark) {
    color: #d1d5db;
    background: #1e3a8a;
    border-left-color: #60a5fa;
  }
`

const StyledH1 = styled.h1`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #111827;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
`

const StyledH2 = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #111827;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
`

const StyledH3 = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #111827;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
`

const StyledH4 = styled.h4`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #111827;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
`

const StyledH5 = styled.h5`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #111827;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
`

const StyledH6 = styled.h6`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #111827;

  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
`

const StyledHr = styled.hr`
  margin: 16px 0;
  border: none;
  border-top: 1px solid #e5e7eb;

  @media (prefers-color-scheme: dark) {
    border-top-color: #374151;
  }
`

const StyledA = styled.a`
  color: #2563eb;
  text-decoration: underline;

  &:hover {
    color: #1d4ed8;
  }

  @media (prefers-color-scheme: dark) {
    color: #60a5fa;

    &:hover {
      color: #93c5fd;
    }
  }
`

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return <SSRMarkdownRenderer content={content} className={className} />
}
