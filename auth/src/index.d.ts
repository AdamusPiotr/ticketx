declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_TOKEN: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
      PWD: string;
    }
  }
}

export {};
