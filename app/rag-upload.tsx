'use client';

import React from 'react';
import RAGUploadWizard from '@/components/RAGUploadWizard'; // Import the RAGUploadWizard component

const RagUploadPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-16">
                <header className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-4">Upload Data for RAG</h1>
                    <p className="text-xl text-gray-400">Enhance your Retrieval-Augmented Generation system with custom data</p>
                </header>

                {/* Render the RAGUploadWizard component */}
                <RAGUploadWizard />
            </div>
        </div>
    );
};

export default RagUploadPage;