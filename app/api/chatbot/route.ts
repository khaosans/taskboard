import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { message } = await req.json();

  // Here you would integrate with your chatbot service
  const reply = await getChatbotReply(message); // Implement this function to get a response from your chatbot

  return NextResponse.json({ reply });
}

// Example function to simulate chatbot response
async function getChatbotReply(message: string) {
  // Replace this with actual API call to your chatbot service
  return `You said: ${message}`; // Simulated response
}
