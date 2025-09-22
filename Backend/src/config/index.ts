import dotenv from 'dotenv';
dotenv.config();

const baseConfig = {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT ?? 5000,
  app_base_url: process.env.APP_BASE_URL,
  supabase_url: process.env.SUPABASE_URL,
  supabase_key: process.env.SUPABASE_KEY,
};

const environments = {
  development: {
    ...baseConfig,
    node_env: process.env.NODE_ENV ?? 'development',
  },
  production: {
    ...baseConfig,
    node_env: process.env.NODE_ENV ?? 'production',
  },
};

export const config =
  process.env.NODE_ENV === 'production'
    ? environments.production
    : environments.development;
