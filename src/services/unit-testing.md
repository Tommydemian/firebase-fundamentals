1. yarn create vite
2. React + TypeScript
3. yarn
4. yarn add -D vitest
5. modify package.json
```json
"test": "vitest"
```
6. yarn add --dev @testing-library/react
7. yarn add --dev @testing-library/jest-dom
8. yarn add --dev @testing-library/user-event
9. yarn add -D jsdom
10. yarn add -D @types/jest
11. yarn add -D @types/node

## Vitest React Example

Check out the [Vitest React Testing Library Example](https://github.com/vitest-dev/vitest/tree/main/examples/react-testing-lib) on GitHub for a practical demonstration.

vite.config.ts
```typescript
/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: true,
  },
})
```

tsconfig.json:
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": false,
    "skipLibCheck": false,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "types": ["vitest/globals"]
  },
  "include": ["./src"]
}
```