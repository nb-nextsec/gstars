/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type Runtime = import('@astrojs/cloudflare').Runtime<{
  DB: D1Database;
  IMAGES: R2Bucket;
  EMAIL: { send: (msg: unknown) => Promise<void> };
  JWT_SECRET: string;
  SITE_URL: string;
}>;

declare namespace App {
  interface Locals extends Runtime {}
}
