export interface Env {
  DB: D1Database;
  IMAGES: R2Bucket;
  EMAIL: {
    send: (msg: unknown) => Promise<void>;
  };
  JWT_SECRET: string;
  SITE_URL: string;
}

export interface User {
  id: number;
  username: string;
  created_at: string;
}

export interface JWTPayload {
  sub: number;
  username: string;
  exp: number;
  iat: number;
}
