'use client'

import React, { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast"
import { Settings, defaultSettings } from '@/lib/settings'

export default function SettingsPage() {
    const [settings, setSettings] = useState<Settings>(defaultSettings)
    const [availableModels, setAvailableModels] = useState<string[]>([])

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await fetch('/api/tags')
                const data = await response.json()
                setAvailableModels(data.models)
            } catch (error) {
                console.error('Error fetching models:', error)
            }
        }

        fetchModels()
    }, [])

    const handleSaveGeneral = () => {
        toast.success("Your general settings have been updated.")
    }

    const handleModelChange = (value: string) => {
        setSettings({ ...settings, model: value })
        toast.success(`Model changed to ${value}`)
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    <TabsTrigger value="model">Model Config</TabsTrigger>
                </TabsList>
                <TabsContent value="general">
                    {/* Existing general settings content */}
                </TabsContent>
                <TabsContent value="model">
                    <Card>
                        <CardHeader>
                            <CardTitle>Model Configuration</CardTitle>
                            <CardDescription>Select your preferred AI model.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="model">Ollama Model</label>
                                <Select value={settings.model} onValueChange={handleModelChange}>
                                    <SelectTrigger id="model">
                                        <SelectValue>{settings.model}</SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableModels.map((model) => (
                                            <SelectItem key={model} value={model}>{model}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button size="sm" variant="default" onClick={() => toast.success("Model settings saved")}>Save Changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                {/* Existing security and advanced tabs content */}
            </Tabs>
        </div>
    )
}