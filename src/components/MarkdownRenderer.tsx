import Markdown from 'markdown-to-jsx'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={className}>
      <Markdown
        options={{
          overrides: {
            // Custom styling for markdown elements with better spacing
            p: {
              props: {
                className: "mb-3 last:mb-0 leading-relaxed text-gray-900 dark:text-gray-100"
              }
            },
            strong: {
              props: {
                className: "font-semibold text-gray-900 dark:text-white dark:font-bold"
              }
            },
            em: {
              props: {
                className: "italic text-gray-700"
              }
            },
            code: {
              props: {
                className: "bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800"
              }
            },
            pre: {
              props: {
                className: "bg-gray-100 p-3 rounded-md text-sm font-mono text-gray-800 overflow-x-auto mb-3"
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
                className: "border-l-4 border-blue-300 pl-4 italic mb-3 text-gray-700 bg-blue-50 py-2 rounded-r"
              }
            },
            h1: {
              props: {
                className: "text-xl font-bold mb-3 text-gray-900"
              }
            },
            h2: {
              props: {
                className: "text-lg font-bold mb-2 text-gray-900"
              }
            },
            h3: {
              props: {
                className: "text-base font-bold mb-2 text-gray-900"
              }
            },
            h4: {
              props: {
                className: "text-sm font-bold mb-2 text-gray-900"
              }
            },
            h5: {
              props: {
                className: "text-sm font-bold mb-2 text-gray-900"
              }
            },
            h6: {
              props: {
                className: "text-sm font-bold mb-2 text-gray-900"
              }
            },
            hr: {
              props: {
                className: "my-4 border-gray-200"
              }
            },
            a: {
              props: {
                className: "text-blue-600 hover:text-blue-800 underline",
                target: "_blank",
                rel: "noopener noreferrer"
              }
            }
          }
        }}
      >
        {content}
      </Markdown>
    </div>
  )
}