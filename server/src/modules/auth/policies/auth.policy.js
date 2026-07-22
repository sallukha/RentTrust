export const AUTH_ROLES = ['admin', 'tenant', 'landlord']

export const isValidAuthRole = (role) => AUTH_ROLES.includes(role)

export const normalizeEmail = (value) => {
    if (!value) return ''

    return String(value).trim().toLowerCase()
}

export const normalizePhone = (value) => {
    if (!value) return ''

    return String(value).trim()
}

export const buildIdentityLookup = ({ email, phone, role }) => {
    const query = { role }

    if (email && phone) {
        query.$or = [{ email }, { phone }]
        return query
    }

    if (email) {
        query.email = email
        return query
    }

    query.phone = phone
    return query
}
