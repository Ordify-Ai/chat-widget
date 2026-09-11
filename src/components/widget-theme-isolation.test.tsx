import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ComposerShell, QuestionButton } from './styled/ChatComponents'

describe('widget theme isolation', () => {
  it('keeps the composer light when the host page is dark', () => {
    const { getByTestId } = render(
      <div data-theme="dark">
        <ComposerShell data-testid="composer">composer</ComposerShell>
      </div>
    )

    expect(getComputedStyle(getByTestId('composer')).backgroundColor).toBe(
      'rgb(255, 255, 255)'
    )
  })

  it('keeps quick-question chips light when the host page is dark', () => {
    const { getByRole } = render(
      <div data-theme="dark">
        <QuestionButton>How do I create an agent?</QuestionButton>
      </div>
    )

    expect(getComputedStyle(getByRole('button')).backgroundColor).toBe(
      'rgb(255, 255, 255)'
    )
  })
})
