declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_ID: string;
      GOOGLE_SECRET: string;
      AUTH_SECRET: string;
      NODE_ENV: "development" | "production";
      SALT_ROUNDS: string;
      PORT?: string;
    }
  }
}

export {};
