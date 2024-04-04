import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from '~/app/_components/header'


test('Hello world', () => {
  render(<Header/>)
  expect(screen.getByText('Header')).toBeDefined()
})

test('Check environment', () => {
    expect(process.env.NODE_ENV).toBe('test')
    expect(process.env.FLAG_TEST_ENV).toBe('true')
})