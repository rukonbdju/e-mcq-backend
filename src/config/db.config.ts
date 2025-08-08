import { Pool } from 'pg';
import { ENV } from './env.config';
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "../schema"

export const pool = new Pool({
    connectionString: ENV.DATABASE_URL,
});

export const db = drizzle({ client: pool, schema });