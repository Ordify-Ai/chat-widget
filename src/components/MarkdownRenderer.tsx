import Markdown from 'markdown-to-jsx'
import React from 'react'
import styled from 'styled-components'

const MarkdownContainer = styled.div`
  overflow-wrap: anywhere;

  > *:first-child {
    margin-top: 0 !important;
  }

  > *:last-child {
    margin-bottom: 0 !important;
  }

  [data-theme='dark'] & code {
    background-color: #374151 !important;
    color: #e5e7eb !important;
  }

  [data-theme='dark'] & pre {
    background-color: #374151 !important;
    color: #e5e7eb !important;
  }

  [data-theme='dark'] & blockquote {
    background-color: #1e3a8a !important;
    border-left-color: #3b82f6 !important;
    color: #e5e7eb !important;
  }

  [data-theme='dark'] & table th,
  [data-theme='dark'] & table td {
    border-color: #4b5563 !important;
  }

  [data-theme='dark'] & table th {
    background-color: #374151 !important;
    color: #f9fafb !important;
  }
`

interface MarkdownRendererProps {
  content: string
  className?: string
}

const listUlStyle: React.CSSProperties = {
  marginTop: 0,
  marginBottom: '12px',
  paddingLeft: '20px',
  listStyleType: 'disc',
  listStylePosition: 'outside',
  lineHeight: 1.5
}

const listOlStyle: React.CSSProperties = {
  marginTop: 0,
  marginBottom: '12px',
  paddingLeft: '20px',
  listStyleType: 'decimal',
  listStylePosition: 'outside',
  lineHeight: 1.5
}

const listLiStyle: React.CSSProperties = {
  marginBottom: '4px',
  lineHeight: 1.5,
  color: 'inherit'
}

const headingMargin = (fontSize: string): React.CSSProperties => ({
  fontSize,
  fontWeight: 700,
  marginTop: '16px',
  marginBottom: '8px',
  color: 'inherit'
})

function MarkdownTable({
  children,
  ...rest
}: React.PropsWithChildren<React.HTMLAttributes<HTMLTableElement>>) {
  return (
    <div
      style={{
        display: 'block',
        overflowX: 'auto',
        marginBottom: '12px',
        maxWidth: '100%',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <table
        {...rest}
        style={{
          borderCollapse: 'collapse',
          width: '100%',
          fontSize: 'inherit',
          color: 'inherit'
        }}
      >
        {children}
      </table>
    </div>
  )
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <MarkdownContainer className={className}>
      <Markdown
        options={{
          overrides: {
            p: {
              props: {
                style: {
                  marginTop: 0,
                  marginBottom: '12px',
                  lineHeight: 1.5,
                  color: 'inherit'
                }
              }
            },
            strong: {
              props: {
                style: {
                  fontWeight: 700,
                  color: 'inherit'
                }
              }
            },
            em: {
              props: {
                style: {
                  fontStyle: 'italic',
                  color: 'inherit'
                }
              }
            },
            code: {
              props: {
                style: {
                  backgroundColor: '#f3f4f6',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontFamily: 'monospace',
                  color: '#111827'
                }
              }
            },
            pre: {
              props: {
                style: {
                  backgroundColor: '#f3f4f6',
                  padding: '12px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: 'monospace',
                  color: '#111827',
                  overflowX: 'auto',
                  marginTop: 0,
                  marginBottom: '12px'
                }
              }
            },
            ul: {
              props: {
                style: listUlStyle
              }
            },
            ol: {
              props: {
                style: listOlStyle
              }
            },
            li: {
              props: {
                style: listLiStyle
              }
            },
            table: {
              component: MarkdownTable
            },
            th: {
              props: {
                style: {
                  border: '1px solid #e5e7eb',
                  padding: '6px 8px',
                  textAlign: 'left',
                  backgroundColor: '#f9fafb',
                  fontWeight: 600,
                  color: 'inherit'
                }
              }
            },
            td: {
              props: {
                style: {
                  border: '1px solid #e5e7eb',
                  padding: '6px 8px',
                  textAlign: 'left',
                  verticalAlign: 'top',
                  color: 'inherit'
                }
              }
            },
            tr: {
              props: {
                style: {
                  backgroundColor: 'transparent'
                }
              }
            },
            thead: {
              props: {
                style: {
                  backgroundColor: 'transparent'
                }
              }
            },
            tbody: {
              props: {
                style: {
                  backgroundColor: 'transparent'
                }
              }
            },
            blockquote: {
              props: {
                style: {
                  borderLeft: '4px solid #93c5fd',
                  padding: '8px',
                  paddingLeft: '16px',
                  fontStyle: 'italic',
                  marginTop: 0,
                  marginBottom: '12px',
                  backgroundColor: '#eff6ff',
                  borderRadius: '4px',
                  color: 'inherit'
                }
              }
            },
            h1: {
              props: {
                style: headingMargin('20px')
              }
            },
            h2: {
              props: {
                style: headingMargin('18px')
              }
            },
            h3: {
              props: {
                style: headingMargin('16px')
              }
            },
            h4: {
              props: {
                style: headingMargin('14px')
              }
            },
            h5: {
              props: {
                style: headingMargin('14px')
              }
            },
            h6: {
              props: {
                style: headingMargin('14px')
              }
            },
            hr: {
              props: {
                style: {
                  margin: '16px 0',
                  borderColor: '#e5e7eb',
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }
              }
            },
            a: {
              props: {
                style: {
                  color: '#2563eb',
                  textDecoration: 'underline'
                },
                target: '_blank',
                rel: 'noopener noreferrer'
              }
            },
            img: {
              props: {
                style: {
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  display: 'block',
                  marginBottom: '10px'
                },
                loading: 'lazy',
                decoding: 'async'
              }
            }
          }
        }}
      >
        {content}
      </Markdown>
    </MarkdownContainer>
  )
}
