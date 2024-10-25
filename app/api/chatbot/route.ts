import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { message } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const reply = completion.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Error in chatbot API:', error);
    return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
}
}

// Example function to simulate chatbot response
async function getChatbotReply(message: string) {
  // Replace this with actual API call to your chatbot service
  return `You said: ${message}`; // Simulated response
  }

// Example function to simulate chatbot response
async function getChatbotReply(message: string) {
  // Replace this with actual API call to your chatbot service
  return `You said: ${message}`; // Simulated response
}
