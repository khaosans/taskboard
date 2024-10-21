import { type ClassValue, clsx } from "clsx"

// Utility function to concatenate class names conditionally
export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Example logging utility
export function logger(message: string, level: 'info' | 'warn' | 'error' = 'info') {
  switch (level) {
    case 'info':
      console.info(`[INFO]: ${message}`);
      break;
    case 'warn':
      console.warn(`[WARN]: ${message}`);
      break;
    case 'error':
      console.error(`[ERROR]: ${message}`);
      break;
    default:
      console.log(`[LOG]: ${message}`);
  }
}

// Add more utility functions as needed
