const fs = require('fs');
const path = require('path');

jest.mock('fs');

describe('Component Finder', () => {
  const mockComponentsDir = '/mock/components';
  const mockPagesDir = '/mock/app';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function getComponentsInDir(dir) {
    return fs.readdirSync(dir).filter(file => file.endsWith('.tsx')).map(file => file.replace('.tsx', ''));
  }

  function getComponentsInPages(dir) {
    const components = new Set();
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        const subComponents = getComponentsInPages(filePath);
        subComponents.forEach(component => components.add(component));
      } else if (file.endsWith('.tsx')) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const matches = content.match(/import\s+{[^}]+}\s+from\s+'[^']+';/g) || [];
        matches.forEach(match => {
          const importedComponents = match.match(/{([^}]+)}/)[1].split(',').map(c => c.trim());
          importedComponents.forEach(component => components.add(component));
        });
      }
    });

    return components;
  }

  test('should identify unused components and generate delete command', () => {
    fs.readdirSync.mockImplementation((dir) => {
      if (dir === mockComponentsDir) {
        return ['ComponentA.tsx', 'ComponentB.tsx', 'ComponentC.tsx'];
      } else if (dir === mockPagesDir) {
        return ['Page1.tsx', 'Page2.tsx'];
      }
      return [];
    });

    fs.statSync.mockImplementation((filePath) => {
      return {
        isDirectory: () => filePath.includes('Page'),
      };
    });

    fs.readFileSync.mockImplementation((filePath) => {
      if (filePath.endsWith('Page1.tsx')) {
        return "import { ComponentA } from 'components';";
      } else if (filePath.endsWith('Page2.tsx')) {
        return "import { ComponentB } from 'components';";
      }
      return '';
    });

    const allComponents = new Set(getComponentsInDir(mockComponentsDir));
    const usedComponents = getComponentsInPages(mockPagesDir);

    const unusedComponents = [...allComponents].filter(component => !usedComponents.has(component));


    const deleteCommand = unusedComponents.map(component => `rm ${path.join(mockComponentsDir, component + '.tsx')}`).join(' && ');

  });
});
