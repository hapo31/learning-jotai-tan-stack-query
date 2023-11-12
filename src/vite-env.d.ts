/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_KEY: string;
  VITE_HOST: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}
