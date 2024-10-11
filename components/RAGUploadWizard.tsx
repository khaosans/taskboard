import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, AlertCircle, CheckCircle2, File, Trash2, Upload, Send, FileText } from 'lucide-react';
import { GoogleDriveButton } from "@/components/ui/google-drive-button";

const RAGUploadWizard: React.FC = () => {
    const [step, setStep] = useState(1);
    const [files, setFiles] = useState<File[]>([]);
    const [urlData, setUrlData] = useState('');
    const [manualData, setManualData] = useState('');
    const [aiAssistData, setAiAssistData] = useState('');
    const [aiPrompt, setAiPrompt] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState('');
    const [isGoogleDriveLinked, setIsGoogleDriveLinked] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

    useEffect(() => {
        // This ensures that browser-specific APIs are only accessed after component mount
    }, []);

    const handleNext = () => {
        if (step < 4) setStep(step + 1);
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

    const handleUrlFetch = () => {
        // Handle URL fetching logic here
        setUploadStatus('URL content fetched successfully');
    };

    const handleGoogleDriveLink = () => {
        // Simulating Google Drive linking process
        setIsGoogleDriveLinked(true);
        setUploadStatus('Google Drive linked successfully');
    };

    const handleUpload = async () => {
        setUploadStatus('Uploading...');
        let progress = 0;
        const interval = window.setInterval(() => {
            progress += 10;
            setUploadProgress(progress);
            if (progress >= 100) {
                window.clearInterval(interval);
                setUploadStatus('Upload complete!');
            }
        }, 500);

        // Simulate sending data to the backend
        const formData = new window.FormData();
        files.forEach(file => formData.append('files', file));
        formData.append('urlData', urlData);
        formData.append('manualData', manualData);

        try {
            const response = await window.fetch('/api/upload', { // Adjust the API endpoint as needed
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            // Handle successful upload response
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Error uploading data:', error);
            setUploadStatus('Upload failed');
        }

        // Simulate adding uploaded files to the list
        setUploadedFiles(prev => [...prev, ...files.map(f => f.name)]);
        setFiles([]);
        setUrlData('');
        setManualData('');
        setAiAssistData('');
    };

    const handleAiAssist = async () => {
        if (!aiPrompt) return;

        try {
            const response = await fetch('/api/ai-assist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: aiPrompt }),
            });

            if (!response.ok) {
                throw new Error('AI assist request failed');
            }

            const data = await response.json();
            setAiAssistData(data.content);
        } catch (error) {
            console.error('Error in AI assist:', error);
            setUploadStatus('AI assist failed');
        }
    };

    const handleDeleteFile = (fileName: string) => {
        setUploadedFiles(prev => prev.filter(f => f !== fileName));
    };

    return (
        <div className="container mx-auto p-4 max-w-3xl">
            <Card className="bg-gray-800 text-gray-100">
                <CardHeader>
                    <CardTitle>Upload Data for RAG</CardTitle>
                    <CardDescription className="text-gray-300">Enhance your Retrieval-Augmented Generation system with custom data</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="upload" className="w-full">
                        <TabsList className="grid w-full grid-cols-5">
                            <TabsTrigger value="upload">File Upload</TabsTrigger>
                            <TabsTrigger value="url">URL</TabsTrigger>
                            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                            <TabsTrigger value="ai-assist">AI Assist</TabsTrigger>
                            <TabsTrigger value="manage">Manage Files</TabsTrigger>
                        </TabsList>
                        <TabsContent value="upload">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Upload Files</CardTitle>
                                    <CardDescription>Upload files or link your Google Drive</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center space-x-4">
                                        <Button onClick={() => {
                                            const fileInput = document.getElementById('file-upload') as HTMLInputElement;
                                            if (fileInput) fileInput.click();
                                        }}>
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
                                        <GoogleDriveButton onClick={handleGoogleDriveLink} />
                                    </div>
                                    {isGoogleDriveLinked && (
                                        <Alert>
                                            <CheckCircle2 className="h-4 w-4" />
                                            <AlertTitle>Google Drive Linked</AlertTitle>
                                            <AlertDescription>Your Google Drive is now connected.</AlertDescription>
                                        </Alert>
                                    )}
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
                        <TabsContent value="url">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Enter URL</CardTitle>
                                    <CardDescription>Provide a URL to fetch data from</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex space-x-2">
                                        <Input
                                            type="url"
                                            placeholder="Enter URL"
                                            value={urlData}
                                            onChange={(e) => setUrlData(e.target.value)}
                                        />
                                        <Button onClick={handleUrlFetch}>Fetch</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="manual">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Manual Text Entry</CardTitle>
                                    <CardDescription>Paste or type your data directly</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Textarea
                                        placeholder="Paste or type your data here"
                                        value={manualData}
                                        onChange={(e) => setManualData(e.target.value)}
                                        rows={10}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="ai-assist">
                            <Card className="bg-gray-700 text-gray-100">
                                <CardHeader>
                                    <CardTitle>AI-Assisted Text Entry</CardTitle>
                                    <CardDescription className="text-gray-300">Use AI to help generate content for RAG</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex space-x-2">
                                        <Input
                                            type="text"
                                            placeholder="Enter a prompt for AI assistance"
                                            value={aiPrompt}
                                            onChange={(e) => setAiPrompt(e.target.value)}
                                            className="bg-gray-600 text-gray-100 placeholder-gray-400"
                                        />
                                        <Button onClick={handleAiAssist} className="bg-blue-500 hover:bg-blue-600 text-white">
                                            <Send className="mr-2 h-4 w-4" /> Generate
                                        </Button>
                                    </div>
                                    <Textarea
                                        placeholder="AI-generated content will appear here"
                                        value={aiAssistData}
                                        onChange={(e) => setAiAssistData(e.target.value)}
                                        rows={10}
                                        className="bg-gray-600 text-gray-100 placeholder-gray-400"
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="manage">
                            <Card className="bg-gray-700 text-gray-100">
                                <CardHeader>
                                    <CardTitle>Manage Uploaded Files</CardTitle>
                                    <CardDescription className="text-gray-300">View and manage your uploaded files</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                                        {uploadedFiles.map((fileName, index) => (
                                            <div key={index} className="flex items-center justify-between py-2">
                                                <div className="flex items-center">
                                                    <FileText className="mr-2 h-4 w-4" />
                                                    <span>{fileName}</span>
                                                </div>
                                                <Button variant="destructive" size="sm" onClick={() => handleDeleteFile(fileName)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        {uploadedFiles.length === 0 && (
                                            <p className="text-gray-400">No files uploaded yet.</p>
                                        )}
                                    </ScrollArea>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    {step === 3 && (
                        <div className="mt-8">
                            <h2 className="text-lg font-semibold mb-4">Data Preview and Validation</h2>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Data Preview</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                                        {files.map((file, index) => (
                                            <div key={index} className="py-2">
                                                <strong>{file.name}</strong>: {file.size} bytes
                                            </div>
                                        ))}
                                        {urlData && <div><strong>URL:</strong> {urlData}</div>}
                                        {manualData && <div><strong>Manual Entry:</strong> {manualData.slice(0, 200)}...</div>}
                                    </ScrollArea>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="mt-8">
                            <h2 className="text-lg font-semibold mb-4">Upload Confirmation</h2>
                            <Alert>
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Ready to upload</AlertTitle>
                                <AlertDescription>
                                    Your data is ready to be uploaded and indexed for RAG. Click the button below to start the process.
                                </AlertDescription>
                            </Alert>
                            <div className="mt-4">
                                <Button onClick={handleUpload}>Upload and Index</Button>
                            </div>
                            {uploadStatus && (
                                <div className="mt-4">
                                    <Progress value={uploadProgress} className="w-full" />
                                    <p className="text-sm text-gray-600 mt-2">{uploadStatus}</p>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="mt-8">
                        <Button onClick={handleUpload} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                            Upload and Index
                        </Button>
                    </div>
                    {uploadStatus && (
                        <div className="mt-4">
                            <Progress value={uploadProgress} className="w-full" />
                            <p className="text-sm text-gray-300 mt-2">{uploadStatus}</p>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button onClick={handleBack} disabled={step === 1} className="bg-gray-600 hover:bg-gray-700 text-gray-100">Back</Button>
                    <Button onClick={handleNext} disabled={step === 4} className="bg-blue-500 hover:bg-blue-600 text-white">
                        Next <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default RAGUploadWizard;