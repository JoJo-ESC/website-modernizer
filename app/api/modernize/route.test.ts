import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock NextResponse before importing the route to avoid pulling in full Next.js runtime
vi.mock('next/server', () => {
  return {
    NextResponse: {
      json: (data: any, init?: { status?: number }) => new Response(JSON.stringify(data), { status: init?.status || 200 })
    }
  };
});

// Mock the OpenAI SDK to avoid network calls; must appear before importing route
vi.mock('openai', () => {
  class OpenAI {
    apiKey: string;
    constructor(opts: { apiKey: string }) {
      this.apiKey = opts.apiKey;
    }
    chat = {
      completions: {
        create: async () => ({
          choices: [
            { message: { content: '<main><h1>Modern Title</h1><p>Converted.</p></main>' } }
          ]
        })
      }
    };
  }
  return { default: OpenAI };
});

import { POST } from './route';

beforeEach(() => {
  process.env.OPENAI_API_KEY = 'sk-test';
});

describe('POST /api/modernize basic', () => {
  it('returns modernized HTML for valid input', async () => {
    const req = new Request('http://localhost/api/modernize', {
      method: 'POST',
      body: JSON.stringify({ html: '<div>Legacy</div>' })
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.modernized).toContain('<main>');
    expect(data.modernized).toContain('Modern Title');
  });

  it('returns 400 when html field missing', async () => {
    const req = new Request('http://localhost/api/modernize', {
      method: 'POST',
      body: JSON.stringify({ notHtml: '<div>Legacy</div>' })
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/html/gi);
  });
});
