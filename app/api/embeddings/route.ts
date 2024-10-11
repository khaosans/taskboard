import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { text } = await req.json();

    // Call the local Ollama model for embeddings
    const response = await fetch('http://localhost:11434/v1/embeddings', { // Adjust the URL as needed
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }), // Send the text to the local model
    });

    if (!response.ok) {
        const errorText = await response.text();
        return NextResponse.json({ error: `Failed to generate embeddings: ${errorText}` }, { status: 500 });
    }

    const { embeddings } = await response.json(); // Assuming the response contains the embeddings
    return NextResponse.json({ embeddings });
}