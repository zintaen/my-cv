import type { E_Environment } from '@cyberskill/shared/typescript';

export interface I_Environment {
    VITE_NODE_ENV: E_Environment.DEVELOPMENT | E_Environment.PRODUCTION;
    VITE_NODE_ENV_MODE: E_Environment;
    IS_DEV: boolean;
    IS_STAG: boolean;
    IS_PROD: boolean;
    VITE_PORT: number;
}
