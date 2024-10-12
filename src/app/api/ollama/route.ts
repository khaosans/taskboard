import { NextResponse } from 'next/server';

// Example settings for the current model
const modelSettings = {
    temperature: 0.7,
    maxTokens: 150,
    // Add other settings as needed
};

export async function POST(request: Request, p0: any) {
    const { message } = await request.json();

    // Here you would typically call your Ollama service or logic
    // For demonstration, we'll just echo the message back
    const reply = `Ollama received: ${message} with settings: ${JSON.stringify(modelSettings)}`;

    return NextResponse.json({ reply });
}