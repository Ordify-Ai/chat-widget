<template>
  <div class="markdown-content" v-html="renderedContent"></div>
</template>

<script>
import Markdown from 'markdown-to-jsx'

export default {
  name: 'MarkdownRenderer',
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  computed: {
    renderedContent() {
      if (!this.content) return ''

      try {
        // Convert markdown to JSX-like HTML
        const html = Markdown(this.content, {
          wrapper: 'div',
          forceWrapper: true,
          overrides: {
            // Custom overrides for better styling
            p: {
              props: {
                style: 'margin: 0.5em 0; line-height: 1.6;',
              },
            },
            code: {
              props: {
                style:
                  'background-color: #f3f4f6; padding: 0.2em 0.4em; border-radius: 3px; font-family: monospace; font-size: 0.9em;',
              },
            },
            pre: {
              props: {
                style:
                  'background-color: #f3f4f6; padding: 1em; border-radius: 6px; overflow-x: auto; margin: 1em 0;',
              },
            },
            ul: {
              props: {
                style: 'margin: 0.5em 0; padding-left: 1.5em;',
              },
            },
            ol: {
              props: {
                style: 'margin: 0.5em 0; padding-left: 1.5em;',
              },
            },
            li: {
              props: {
                style: 'margin: 0.25em 0;',
              },
            },
            strong: {
              props: {
                style: 'font-weight: 600;',
              },
            },
            em: {
              props: {
                style: 'font-style: italic;',
              },
            },
            blockquote: {
              props: {
                style:
                  'border-left: 4px solid #e5e7eb; padding-left: 1em; margin: 1em 0; color: #6b7280;',
              },
            },
          },
        })

        return html
      } catch (error) {
        console.warn('Failed to render markdown:', error)
        return this.content
      }
    },
  },
}
</script>

<style scoped>
.markdown-content {
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .markdown-content :deep(code) {
    background-color: #374151 !important;
    color: #f9fafb !important;
  }

  .markdown-content :deep(pre) {
    background-color: #374151 !important;
    color: #f9fafb !important;
  }

  .markdown-content :deep(blockquote) {
    border-left-color: #4b5563 !important;
    color: #9ca3af !important;
  }
}
</style>
