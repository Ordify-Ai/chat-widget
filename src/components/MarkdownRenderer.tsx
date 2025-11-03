import Markdown from 'markdown-to-jsx'
import styled from 'styled-components'

const MarkdownContainer = styled.div`
  code {
    @media (prefers-color-scheme: dark) {
      background-color: #374151 !important;
      color: #e5e7eb !important;
    }
    
    [data-theme="dark"] & {
      background-color: #374151 !important;
      color: #e5e7eb !important;
    }
  }
  
  pre {
    @media (prefers-color-scheme: dark) {
      background-color: #374151 !important;
      color: #e5e7eb !important;
    }
    
    [data-theme="dark"] & {
      background-color: #374151 !important;
      color: #e5e7eb !important;
    }
  }
  
  blockquote {
    @media (prefers-color-scheme: dark) {
      background-color: #1e3a8a !important;
      border-left-color: #3b82f6 !important;
      color: #e5e7eb !important;
    }
    
    [data-theme="dark"] & {
      background-color: #1e3a8a !important;
      border-left-color: #3b82f6 !important;
      color: #e5e7eb !important;
    }
  }
`

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <MarkdownContainer className={className}>
      <Markdown
        options={{
          overrides: {
            // Custom styling for markdown elements with better spacing
            p: {
              props: {
                style: { 
                  marginBottom: '12px',
                  lineHeight: '1.5',
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
                  marginBottom: '12px'
                }
              }
            },
            ul: {
              props: {
                className: "list-disc list-inside mb-3 space-y-1 ml-2"
              }
            },
            ol: {
              props: {
                className: "list-decimal list-inside mb-3 space-y-1 ml-2"
              }
            },
            li: {
              props: {
                className: "leading-relaxed"
              }
            },
            blockquote: {
              props: {
                style: {
                  borderLeft: '4px solid #93c5fd',
                  paddingLeft: '16px',
                  padding: '8px',
                  fontStyle: 'italic',
                  marginBottom: '12px',
                  backgroundColor: '#eff6ff',
                  borderRadius: '4px',
                  color: 'inherit'
                }
              }
            },
            h1: {
              props: {
                style: {
                  fontSize: '20px',
                  fontWeight: 700,
                  marginBottom: '12px',
                  color: 'inherit'
                }
              }
            },
            h2: {
              props: {
                style: {
                  fontSize: '18px',
                  fontWeight: 700,
                  marginBottom: '8px',
                  color: 'inherit'
                }
              }
            },
            h3: {
              props: {
                style: {
                  fontSize: '16px',
                  fontWeight: 700,
                  marginBottom: '8px',
                  color: 'inherit'
                }
              }
            },
            h4: {
              props: {
                style: {
                  fontSize: '14px',
                  fontWeight: 700,
                  marginBottom: '8px',
                  color: 'inherit'
                }
              }
            },
            h5: {
              props: {
                style: {
                  fontSize: '14px',
                  fontWeight: 700,
                  marginBottom: '8px',
                  color: 'inherit'
                }
              }
            },
            h6: {
              props: {
                style: {
                  fontSize: '14px',
                  fontWeight: 700,
                  marginBottom: '8px',
                  color: 'inherit'
                }
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
                target: "_blank",
                rel: "noopener noreferrer"
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