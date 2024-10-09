import fs from 'fs';
import path from 'path';
import { describe, it, expect } from '@jest/globals';

describe('Directory Structure', () => {
  // eslint-disable-next-line no-undef
  const appDir = path.join(__dirname, '..', 'app');

  it('has the correct app directory structure', () => {
    expect(fs.existsSync(appDir)).toBe(true);
    expect(fs.existsSync(path.join(appDir, 'layout.tsx'))).toBe(true);
    expect(fs.existsSync(path.join(appDir, 'page.tsx'))).toBe(true);
    // Add more checks for expected directories and files
  });
});
