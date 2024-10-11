import { NextRequest, NextResponse } from 'next/server';
import { searchSimilarEmbeddings } from '@/lib/db';

const cache = new Map(); // Simple in-memory cache

interface Document {
  metadata?: {
    content: string;
  };
}

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams.get('query');
    const genre = req.nextUrl.searchParams.get('genre'); // Get genre from query parameters
    if (!query) return NextResponse.json({ error: 'No query provided' }, { status: 400 });

    // Check if the response is cached
    if (cache.has(query)) {
        return NextResponse.json({ answer: cache.get(query) });
    }

    try {
        // Step 1: Generate embeddings for the query using the local Ollama model
        const response = await fetch('http://localhost:11434/v1/embeddings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: query }),
        });

        if (!response.ok) {
            throw new Error(`Failed to generate embeddings: ${await response.text()}`);
        }

        const { embeddings: queryEmbedding } = await response.json();

        // Step 2: Search for relevant documents in the vector database with optional filtering
        const filter = genre ? { genre: { '$eq': genre } } : undefined;
        const relevantDocs = await searchSimilarEmbeddings(queryEmbedding, 5, filter);

        // Step 3: Use the retrieved documents as context for generating a response
        const context = relevantDocs
            .map(doc => doc.metadata?.content || '')
            .filter(content => content !== '')
            .join('\n');

        const completionResponse = await fetch('http://localhost:11434/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'your-model-name', // Specify the model name if needed
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: `Here is some context:\n${context}\n\nAnswer the following query: ${query}` },
                ],
            }),
        });

        if (!completionResponse.ok) {
            throw new Error(`Failed to generate response: ${await completionResponse.text()}`);
        }

        const data = await completionResponse.json();
        const answer = data.choices[0]?.message?.content;

        if (!answer) {
            throw new Error('No answer generated');
        }

        cache.set(query, answer); // Cache the answer
        return NextResponse.json({ answer });
    } catch (error: any) {
        // Removed console.error as it's not defined in this context
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}