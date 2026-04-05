import { mergeConfigs } from '@cyberskill/shared/config';

export default mergeConfigs('eslint', {
    ignores: ['src/shared/graphql/generated'],
});
