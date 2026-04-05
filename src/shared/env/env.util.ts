import { E_Environment } from '@cyberskill/shared/typescript';
import { mapEnvironment } from '@cyberskill/shared/util';
import { cleanEnv, port, str } from 'envalid';

import type { I_Environment } from './env.type';

export function getEnv(): I_Environment {
    // eslint-disable-next-line node/prefer-global/process
    const cleanedEnv = cleanEnv(typeof window !== 'undefined' ? import.meta.env : process.env, {
        VITE_NODE_ENV: str({
            choices: [E_Environment.DEVELOPMENT, E_Environment.PRODUCTION],
            default: E_Environment.DEVELOPMENT,
        }),
        VITE_NODE_ENV_MODE: str({
            choices: [E_Environment.DEVELOPMENT, E_Environment.STAGING, E_Environment.PRODUCTION],
            default: E_Environment.DEVELOPMENT,
        }),
        VITE_PORT: port(),
    });

    return {
        ...cleanedEnv,
        ...mapEnvironment({
            NODE_ENV: cleanedEnv.VITE_NODE_ENV,
            NODE_ENV_MODE: cleanedEnv.VITE_NODE_ENV_MODE,
        }),
    };
}
