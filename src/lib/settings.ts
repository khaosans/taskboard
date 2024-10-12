export interface Settings {
    userId: string;
    theme: 'light' | 'dark';
    notifications: boolean;
    language: string;
    model: string; // Added model field
}

export const defaultSettings: Settings = {
    userId: '',
    theme: 'light',
    notifications: true,
    language: 'en',
    model: 'llama2', // Default Ollama model
};
