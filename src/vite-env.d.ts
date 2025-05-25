/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly REACT_APP_BASE_URL: string
    // add other environment variables here as needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}