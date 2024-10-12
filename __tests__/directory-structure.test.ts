import fs from 'fs';
import path from 'path';
import { describe, it, expect } from '@jest/globals';

describe('Directory Structure', () => {
  // eslint-disable-next-line no-undef
  //src directory
  const srcDir = path.join(process.cwd(), 'src');


  //updaete the fistucure to start in src
  it('has the correct app directory structure', () => {
    expect(fs.existsSync(srcDir)).toBe(true);

    const appDir = path.join(srcDir, 'app');
    expect(fs.existsSync(appDir)).toBe(true);

    const componentsDir = path.join(appDir, 'components');
  });

  it('ensures no duplicate folder names in src and app directories', () => {
    const appDirs = ['components', 'api', 'lib', 'utils', 'types', 'public'];
    const srcDirs = fs.readdirSync(srcDir);

    // Check for duplicate directories in src
    const srcDuplicates = srcDirs.filter((dir, index, self) => self.indexOf(dir) !== index);
    expect(srcDuplicates).toEqual([]);

    // Check for duplicate directories in app
    const appDuplicates = appDirs.filter((dir, index, self) => self.indexOf(dir) !== index);
    expect(appDuplicates).toEqual([]);
  }); 
});
