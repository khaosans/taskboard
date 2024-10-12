"use client"; // Mark this component as a Client Component

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"; // Absolute path
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Absolute path
import { Input } from "@/components/ui/input"; // Absolute path
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Absolute path
import { Progress } from "@/components/ui/progress"; // Absolute path
import { ScrollArea } from "@/components/ui/scroll-area"; // Absolute path
import { ChevronRight, File, Trash2, Upload, Search } from 'lucide-react';
import { Pinecone } from '@pinecone-database/pinecone'; // Import Pinecone with types

// Initialize Pinecone client
const apiKey = process.env.NEXT_PUBLIC_PINECONE_API_KEY;
if (!apiKey) {
  throw new Error('PINECONE_API_KEY is not defined in the environment variables.');
}

const pc = new Pinecone({
  apiKey: apiKey
});

const RAGUploadWizard = () => {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');
  const [inferenceQuery, setInferenceQuery] = useState('');
  const [inferenceResults, setInferenceResults] = useState<any[]>([]);

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    setFiles([...files, ...newFiles]);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const fetchEmbeddings = async (text: string) => {
    const response = await fetch('http://localhost:11434/api/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'nomic-embed-text',
        prompt: text,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch embeddings');
    }

    const data = await response.json();
    return data.embeddings; // Adjust based on the actual response structure
  };

  const handleUpload = async () => {
    setUploadStatus('Processing and uploading data...');
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setUploadStatus('Upload complete! Data processed and stored in Pinecone.');
      }
    }, 500);

    // Prepare vectors for upload
    const vectors = await Promise.all(files.map(async (file, index) => {
      const text = await file.text(); // Read the file content
      const embedding = await fetchEmbeddings(text); // Get embeddings from local API
      return {
        id: `${index + 1}`,
        values: embedding, // Use the embeddings as vector values
        metadata: { text: file.name }
      };
    }));

    // Upsert vectors to Pinecone
    await pc.upsert(vectors); // Upload vectors to Pinecone
  };

  const handleInference = async () => {
    setUploadStatus('Performing inference...');
    // Simulate vector encoding of the query
    const queryVector = [0.1, 0.2, 0.3]; // Replace with actual vector encoding logic
    const results = await pc.query(queryVector); // Query Pinecone
    setInferenceResults(results);
    setUploadStatus('Inference complete!');
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>RAG Upload and Inference with Pinecone</CardTitle>
          <CardDescription>Upload data, process with Pinecone, and perform inference</CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upload">File Upload</TabsTrigger>
                <TabsTrigger value="url">URL</TabsTrigger>
                <TabsTrigger value="manual">Manual Entry</TabsTrigger>
              </TabsList>
              <TabsContent value="upload">
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Files</CardTitle>
                    <CardDescription>Upload files for processing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Button onClick={() => document.getElementById('file-upload')?.click()}>
                        <Upload className="mr-2 h-4 w-4" /> Select Files
                      </Button>
                      <Input
                        id="file-upload"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileUpload}
                        accept=".pdf,.docx,.csv,.txt"
                      />
                    </div>
                    <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between py-2">
                          <div className="flex items-center">
                            <File className="mr-2 h-4 w-4" />
                            <span>{file.name}</span>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => handleRemoveFile(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
              {/* Additional tabs for URL and Manual Entry can be added here */}
            </Tabs>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Process and Upload to Pinecone</h2>
              <Button onClick={handleUpload}>Process and Upload</Button>
              {uploadStatus && (
                <div className="mt-4">
                  <Progress value={uploadProgress} className="w-full" />
                  <p className="text-sm text-gray-600 mt-2">{uploadStatus}</p>
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Perform Inference</h2>
              <Input
                type="text"
                placeholder="Enter your query"
                value={inferenceQuery}
                onChange={(e: any) => setInferenceQuery(e.target.value)}
              />
              <Button onClick={handleInference}>
                <Search className="mr-2 h-4 w-4" /> Perform Inference
              </Button>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Inference Results</h2>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                {inferenceResults.map((result, index) => (
                  <div key={index} className="py-2">
                    <strong>Match {index + 1}</strong>: {result.metadata.text}
                  </div>
                ))}
              </ScrollArea>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleBack} disabled={step === 1}>Back</Button>
          <Button onClick={handleNext} disabled={step === 5}>
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RAGUploadWizard;
