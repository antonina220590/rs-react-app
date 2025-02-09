import { expect, test } from 'vitest';
import { sum } from './test';

test('adds 1 + 1 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
