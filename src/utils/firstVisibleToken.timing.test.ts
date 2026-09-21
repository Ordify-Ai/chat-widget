import { describe, expect, it } from 'vitest'
import { drainSseBuffer, flushSseBuffer, parseStreamingResponse } from './api'

type Arrival = { atMs: number; chunk: string }

function firstVisibleWithOldParser(arrivals: Arrival[]): {
  firstText: string
  firstTextAtMs: number
} | null {
  let firstText = ''
  let firstTextAtMs: number | null = null
  for (const arrival of arrivals) {
    const lines = arrival.chunk.split('\n')
    for (const line of lines) {
      if (!line.trim()) continue
      const event = parseStreamingResponse(line)
      if (event?.type !== 'stream' || !event.text) continue
      firstText = event.replace ? event.text : firstText + event.text
      if (firstTextAtMs === null && firstText.trim()) {
        firstTextAtMs = arrival.atMs
        return { firstText, firstTextAtMs }
      }
    }
  }
  return firstTextAtMs === null ? null : { firstText, firstTextAtMs }
}

function firstVisibleWithNewParser(arrivals: Arrival[]): {
  firstText: string
  firstTextAtMs: number
} | null {
  let leftover = ''
  let content = ''
  let firstTextAtMs: number | null = null
  for (const arrival of arrivals) {
    leftover += arrival.chunk
    const drained = drainSseBuffer(leftover)
    leftover = drained.leftover
    for (const event of drained.events) {
      if (event.type !== 'stream' || !event.text) continue
      content = event.replace ? event.text : content + event.text
      if (firstTextAtMs === null && content.trim()) {
        firstTextAtMs = arrival.atMs
        return { firstText: content, firstTextAtMs }
      }
    }
  }
  for (const event of flushSseBuffer(leftover)) {
    if (event.type !== 'stream' || !event.text) continue
    content = event.replace ? event.text : content + event.text
    if (firstTextAtMs === null && content.trim()) {
      return { firstText: content, firstTextAtMs: arrivals.at(-1)?.atMs ?? 0 }
    }
  }
  return firstTextAtMs === null ? null : { firstText: content, firstTextAtMs }
}

const splitFirstTokenThenLateReplace: Arrival[] = [
  { atMs: 50, chunk: 'data: {"text":"The answer is' },
  {
    atMs: 800,
    chunk: ' 42.","type":"stream","sessionId":"s1"}\n\n'
  },
  {
    atMs: 2000,
    chunk:
      'data: {"text":"The answer is 42. More text.","type":"stream","sessionId":"s1","replace":true}\n\n'
  }
]

const fullyBufferedUntilEnd: Arrival[] = [
  {
    atMs: 2000,
    chunk: [
      'data: {"text":"The ","type":"stream","sessionId":"s1"}',
      '',
      'data: {"text":"answer is 42.","type":"stream","sessionId":"s1"}',
      '',
      ''
    ].join('\n')
  }
]

describe('first visible token timing', () => {
  it('shows text when a split first frame completes, instead of waiting for the final replace', () => {
    const oldParser = firstVisibleWithOldParser(splitFirstTokenThenLateReplace)
    const newParser = firstVisibleWithNewParser(splitFirstTokenThenLateReplace)

    expect(oldParser).toEqual({
      firstText: 'The answer is 42. More text.',
      firstTextAtMs: 2000
    })
    expect(newParser).toEqual({
      firstText: 'The answer is 42.',
      firstTextAtMs: 800
    })
    expect(newParser!.firstTextAtMs).toBeLessThan(oldParser!.firstTextAtMs)
  })

  it('cannot beat a fully buffered body: first text still arrives at stream end', () => {
    const oldParser = firstVisibleWithOldParser(fullyBufferedUntilEnd)
    const newParser = firstVisibleWithNewParser(fullyBufferedUntilEnd)

    expect(oldParser?.firstTextAtMs).toBe(2000)
    expect(newParser?.firstTextAtMs).toBe(2000)
    expect(newParser?.firstText).toBe('The ')
  })
})
