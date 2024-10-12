'use client';

import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from '../app/contexts/ThemeContext';

interface MonacoEditorProps {
  initialValue?: string;
  language?: string;
  onSave?: (value: string) => void;
}

export function MonacoEditor({
  initialValue = "// Type your code here",
  language = "javascript",
  onSave
}: MonacoEditorProps) {
  const [editorValue, setEditorValue] = useState(initialValue);
  const [editorLanguage, setEditorLanguage] = useState(language);
  const { theme } = useTheme();   
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setEditorValue(value);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(editorValue);
    }
  };

  return (
    <Card className={`w-full max-w-4xl mx-auto ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} border border-gray-700 shadow-lg`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold mb-4">Code Editor</CardTitle>
        <div className="flex justify-between items-center mb-4">
          <Select value={editorLanguage} onValueChange={setEditorLanguage}>
            <SelectTrigger className={`w-[180px] ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-900 border-gray-300'}`}>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent className={theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="typescript">TypeScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="html">HTML</SelectItem>
              <SelectItem value="css">CSS</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleSave} className={`ml-2 ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}>Save</Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className={`border rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <Editor
            height="500px"
            language={editorLanguage}
            theme={theme === 'dark' ? "vs-dark" : "light"}
            value={editorValue}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on',
              automaticLayout: true,
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
