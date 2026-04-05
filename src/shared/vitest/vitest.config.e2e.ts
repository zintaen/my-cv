import { mergeConfigs } from '@cyberskill/shared/config';
import { playwright } from '@vitest/browser-playwright';

import { VITE_ALIAS } from '../../shared/constant';

export default mergeConfigs('vitest-react-e2e', {
    resolve: {
        alias: VITE_ALIAS,
    },
    test: {
        browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
        },
    },
});
