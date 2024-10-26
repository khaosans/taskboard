import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  const { message } = await req.json();

  const headers = req.headers;
  let getHeaders = await headers;

    console.log(getHeaders);
  try {
    const response = await axios.post(
        'https://api-inference.huggingface.co/models/ollama/chatbot',
        { inputs: message },
        {
          headers: {
            Authorization: `Bearer YOUR_HUGGING_FACE_API_KEY`,
          },
        }
    );

    const reply = response.data.generated_text;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Error in chatbot API:', error);
    return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
  }
}
