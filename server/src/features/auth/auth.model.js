export const AUTH_ROLES = ['admin', 'tenant', 'owner']

export const isValidAuthRole = (role) => AUTH_ROLES.includes(role)
