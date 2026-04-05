const BASE = {
    AUTH: '/auth',
    ADMIN: '/admin',
};

export const ROUTES = {
    ERROR: {
        NOT_FOUND: '/not-found',
    },
    HOME: '/home',
    AUTH: {
        LOGIN: `${BASE.AUTH}/login`,
    },
    ADMIN: {
        BASE: BASE.ADMIN,
    },
};

export const PRIVATE_ROUTES = [...Object.values(ROUTES.ADMIN)];
