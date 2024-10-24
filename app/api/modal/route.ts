import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const requestData = {
    prompt: "need for speed supercar. unreal engine",
    width: 768,
    height: 768,
    num_outputs: 1,
  };

  try {
    const result = await fetch(
      "https://modal-labs--instant-stable-diffusion-xl.modal.run/v1/inference",
      {
        headers: {
          Authorization: `Token ${process.env.MODAL_TOKEN_ID}:${process.env.MODAL_TOKEN_SECRET}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(requestData),
      },
    );

    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }

    const imageData = await result.blob();

    // Return the image data as a response
    return new NextResponse(imageData, {
      status: 200,
      headers: {
        'Content-Type': 'image/png', // Adjust this if the image type is different
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}
