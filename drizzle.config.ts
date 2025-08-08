import { defineConfig } from 'drizzle-kit';
import { ENV } from './src/config/env.config'
const drizzleConfig = defineConfig({
    out: './drizzle',
    schema: './src/schema',
    dialect: 'postgresql',
    dbCredentials: {
        url: ENV.DATABASE_URL,
    },
});

export default drizzleConfig;
