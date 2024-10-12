"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"; // Absolute path
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Absolute path
import { Input } from "@/components/ui/input"; // Absolute path
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Absolute path
import { Progress } from "@/components/ui/progress"; // Absolute path
import { ScrollArea } from "@/components/ui/scroll-area"; // Absolute path
import { ChevronRight, File, Trash2, Upload, Search } from 'lucide-react';
import vercelKVClient from '@/utils/vercelKV'; // Import the Vercel KV client

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

  const handleUpload = async () => {
    setUploadStatus('Processing and uploading data...');
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setUploadStatus('Upload complete! Data processed and stored.');
      }
    }, 500);

    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    try {
      await vercelKVClient.post('/api/upload', formData, { // Ensure the path is correct
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            setUploadProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
          }
        }
      });
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadStatus('Upload failed. Please try again.');
    }
  };

  const handleInference = async () => {
    setUploadStatus('Performing inference...');
    try {
      const response = await vercelKVClient.post('/embeddings', {
        model: 'nomic-embed-text',
        prompt: inferenceQuery
      });
      setInferenceResults(response.data);
      setUploadStatus('Inference complete!');
    } catch (error) {
      console.error('Inference failed:', error);
      setUploadStatus('Inference failed. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>RAG Upload and Inference with Ollama</CardTitle>
          <CardDescription>Upload data, process with Ollama, and perform inference</CardDescription>
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
              <h2 className="text-lg font-semibold mb-4">Process and Upload to Ollama</h2>
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
