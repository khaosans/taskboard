import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const files = formData.getAll('files');
    const urlData = formData.get('urlData');
    const manualData = formData.get('manualData');

    // Process the uploaded files, URL data, and manual data
    console.log('Files:', files);
    console.log('URL Data:', urlData);
    console.log('Manual Data:', manualData);

    // Return a success response
    return NextResponse.json({ message: 'Data uploaded successfully' });
}