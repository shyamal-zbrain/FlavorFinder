import { describe, it, expect } from 'vitest';
import { getRandomIndexExcluding } from './random';

describe('getRandomIndexExcluding', () => {
  it('never returns excluded index when length > 1', () => {
    const length = 5; const prev = 2; let ok = true;
    for (let i=0;i<500;i++) { if (getRandomIndexExcluding(prev, length) === prev) { ok = false; break; } }
    expect(ok).toBe(true);
  });
  it('rough distribution over many trials', () => {
    const length = 10; const counts = Array.from({length}, () => 0);
    for (let i=0;i<2000;i++) { counts[getRandomIndexExcluding(null, length)]++; }
    // sanity check: each index should appear > 100 times given 2k trials, allowing variance
    counts.forEach(c => expect(c).toBeGreaterThan(100));
  });
});
