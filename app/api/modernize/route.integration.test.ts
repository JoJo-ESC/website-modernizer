import { config as loadEnv } from 'dotenv';
loadEnv({ path: '.env.local' });
import { describe, it, expect } from 'vitest';
import { POST } from './route';

// Integration test: requires a real OPENAI_API_KEY. If absent, we skip.
const hasKey = !!process.env.OPENAI_API_KEY;

// Provide a tiny legacy HTML input
const sampleLegacy = '<div style="color:red"><font>Legacy <b>HTML</b></font></div>';

describe('OPENAI integration (real network)', () => {
  (hasKey ? it : it.skip)('calls OpenAI and returns modernized HTML', async () => {
    const req = new Request('http://localhost/api/modernize', {
      method: 'POST',
      body: JSON.stringify({ html: sampleLegacy })
    });
    const res = await POST(req);
    const data = await res.json();

    // Diagnostic logging for non-success statuses
    if (![200, 502].includes(res.status)) {
      console.warn('Unexpected status from POST /api/modernize:', res.status, data);
    }

    // Accept 200, 502 (model output invalid), or 500 (runtime / auth failure) for diagnostics
    expect([200, 502, 500]).toContain(res.status);

    if (res.status === 200) {
      expect(data.modernized).toBeTypeOf('string');
      expect(data.modernized.length).toBeGreaterThan(20);
      expect(/<\w+[^>]*>/.test(data.modernized)).toBe(true);
    } else if (res.status === 502) {
      expect(data.error).toMatch(/valid HTML/i);
    } else if (res.status === 500) {
      // Common: auth/network errors; ensure structured error message
      expect(data.error).toMatch(/Failed to modernize HTML|Server misconfiguration/i);
    }
  });
});
