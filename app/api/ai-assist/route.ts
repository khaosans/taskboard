import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { prompt } = await req.json();

    if (!prompt) {
        return NextResponse.json({ error: 'No prompt provided' }, { status: 400 });
    }

    try {
        const response = await fetch('http://localhost:11434/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'your-model-name', // Specify the model name if needed
                messages: [
                    { role: 'system', content: 'You are a helpful assistant for generating content for Retrieval-Augmented Generation systems.' },
                    { role: 'user', content: prompt },
                ],
            }),
        });

        if (!response.ok) {
            throw new Error('AI model request failed');
        }

        const data = await response.json();
        const content = data.choices[0].message?.content;

        return NextResponse.json({ content });
    } catch (error) {
        console.error('Error in AI assist:', error);
        return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
    }
}