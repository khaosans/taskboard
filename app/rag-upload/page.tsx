import RAGUploadWizard from '@/components/rag-upload-wizard'; // Adjusted to use the app directory
import React from 'react';

const RAGUploadPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">RAG Data Upload</h1>
      <RAGUploadWizard /> {/* Render the RAG Upload Wizard component */}
    </div>
  );
};

export default RAGUploadPage;
