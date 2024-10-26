'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Settings, Bell, Lock, Moon } from 'lucide-react'
import RobotTransformerWallpaper from '@/components/RobotTransformerWallpaper'
import TopBar from '../../components/TopBar'

export default function SettingsPage() {
    return (
        <div className="relative min-h-screen overflow-hidden">
            <RobotTransformerWallpaper />
            <div className="relative z-10 min-h-screen bg-gradient-to-b from-blue-900/5 to-purple-900/5 text-white font-sans">
                <div className="container mx-auto p-4">
                    <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Starship Control Panel</h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-blue-900/40 text-cyan-100">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Bell className="mr-2 h-5 w-5" /> Notifications
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <span>Enable push notifications</span>
                                    <Switch />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-blue-900/40 text-cyan-100">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Lock className="mr-2 h-5 w-5" /> Security
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full bg-cyan-500 text-black hover:bg-cyan-400">
                                    Enable Two-Factor Authentication
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="bg-blue-900/40 text-cyan-100">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Moon className="mr-2 h-5 w-5" /> Theme
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <span>Dark Mode</span>
                                    <Switch />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-blue-900/40 text-cyan-100">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Settings className="mr-2 h-5 w-5" /> Preferences
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full bg-cyan-500 text-black hover:bg-cyan-400">
                                    Customize Dashboard
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <TopBar onWalletChange={() => {}} selectedWallet={null} />
        </div>
    );
}
