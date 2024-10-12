import fs from 'fs';
import path from 'path';

describe('Project File Structure', () => {

  it('should not have test files outside __tests__ directory', () => {
    const rootDir = path.resolve(__dirname, '..');
    const allFiles = fs.readdirSync(rootDir, { withFileTypes: true })
      .filter(dirent => dirent.isFile() && !dirent.name.startsWith('.'))
      .map(dirent => dirent.name);

    const testFilesOutside = allFiles.filter(file =>
      (file.endsWith('.test.ts') || file.endsWith('.test.tsx')) &&
      !file.startsWith('__tests__')
    );

    if (testFilesOutside.length > 0) {
      console.log('Test files found outside __tests__ directory:', testFilesOutside);
    }

    expect(testFilesOutside).toEqual([]);
  });
});
