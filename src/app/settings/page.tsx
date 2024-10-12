'use client'

import React, { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'
import { useTheme } from 'next-themes'

const SettingsPage = () => {
    const { user } = useUser();
    const { theme, setTheme } = useTheme()
    const [darkMode, setDarkMode] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [defaultView, setDefaultView] = useState('list');
    const [autoSaveInterval, setAutoSaveInterval] = useState('5');

    useEffect(() => {
        // Load user preferences from localStorage or API
        const loadedDarkMode = theme === 'dark';
        const loadedNotifications = localStorage.getItem('notificationsEnabled') !== 'false';
        const loadedDefaultView = localStorage.getItem('defaultView') || 'list';
        const loadedAutoSaveInterval = localStorage.getItem('autoSaveInterval') || '5';

        setDarkMode(loadedDarkMode);
        setNotificationsEnabled(loadedNotifications);
        setDefaultView(loadedDefaultView);
        setAutoSaveInterval(loadedAutoSaveInterval);
    }, [theme]);

    const saveSettings = () => {
        // Save settings to localStorage or API
        setTheme(darkMode ? 'dark' : 'light');
        localStorage.setItem('notificationsEnabled', notificationsEnabled.toString());
        localStorage.setItem('defaultView', defaultView);
        localStorage.setItem('autoSaveInterval', autoSaveInterval);

        // You would typically save these settings to your backend as well
        // api.saveUserSettings({ darkMode, notificationsEnabled, defaultView, autoSaveInterval });

        toast.success('Settings saved successfully');
    };

    const handleDarkModeChange = (checked: boolean) => {
        setDarkMode(checked);
        setTheme(checked ? 'dark' : 'light');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">App Settings</h1>
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Display Settings</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between mb-4">
                        <span>Dark Mode</span>
                        <Switch
                            checked={darkMode}
                            onCheckedChange={handleDarkModeChange}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Default View</span>
                        <Select value={defaultView} onValueChange={setDefaultView}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select view" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="list">List</SelectItem>
                                <SelectItem value="grid">Grid</SelectItem>
                                <SelectItem value="calendar">Calendar</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <span>Enable Notifications</span>
                        <Switch
                            checked={notificationsEnabled}
                            onCheckedChange={setNotificationsEnabled}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Task Management Settings</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <span>Auto-save Interval (minutes)</span>
                        <Select value={autoSaveInterval} onValueChange={setAutoSaveInterval}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select interval" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="15">15</SelectItem>
                                <SelectItem value="30">30</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Button onClick={saveSettings} className="w-full">Save Settings</Button>
        </div>
    );
};

export default SettingsPage;