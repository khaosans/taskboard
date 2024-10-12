import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { message, model } = await req.json();

  const response = await fetch('http://localhost:11434/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: message }],
      stream: true,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch from Ollama');
  }

  const stream = new ReadableStream({
    async start(controller) {
      const reader = response.body?.getReader();
      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        const chunk = new TextDecoder().decode(value);
        try {
          const parsed = JSON.parse(chunk);
          if (parsed.message?.content) {
            controller.enqueue(parsed.message.content);
          }
        } catch (e) {
          console.error('Error parsing JSON:', e);
        }
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
