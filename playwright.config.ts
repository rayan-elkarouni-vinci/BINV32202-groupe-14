import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5174',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: [
    {
      command: 'npm run db:reset -w backend && npm run dev -w backend',
      url: 'http://localhost:3001/health',
      reuseExistingServer: false,
      env: {
        API_PORT: '3001',
        DATABASE_PATH: 'data/gesta-e2e.db',
      },
    },
    {
      command: 'npm run dev -w frontend -- --port 5174',
      url: 'http://localhost:5174',
      reuseExistingServer: false,
      env: {
        API_PORT: '3001',
      },
    },
  ],
});
