// CommonJS-friendly ping script to test OpenAI connectivity
import('dotenv').then(({ config }) => config({ path: '.env.local' })).then(async () => {
  const OpenAI = (await import('openai')).default;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('Missing OPENAI_API_KEY environment variable.');
    process.exit(1);
  }
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const baseURL = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
  const client = new OpenAI({ apiKey, baseURL });
  try {
    const res = await client.chat.completions.create({
      model,
      temperature: 0,
      messages: [ { role: 'user', content: 'Reply with just: pong' } ]
    });
    const content = res.choices?.[0]?.message?.content?.trim() || '';
    console.log('Ping response:', content);
    if (!/pong/i.test(content)) {
      console.warn('Unexpected response content; got:', content.slice(0,80));
    }
  } catch (err: any) {
    console.error('OpenAI call failed:', err?.message || err);
    if (err?.status) console.error('HTTP status:', err.status);
    process.exit(2);
  }
}).catch(e => {
  console.error('Failed to initialize environment:', e);
  process.exit(1);
});
