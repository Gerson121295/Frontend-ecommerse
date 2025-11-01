import { jwtDecode } from "jwt-decode";

export const decodeToken = (token) => {
  if (!token) return null;
  try {
    const payload = jwtDecode(token);

    const username = payload.username || payload.sub || payload.user || null;

    // Extraer roles robustamente:
    let roles = [];
    if (Array.isArray(payload.roles) && payload.roles.length) {
      roles = payload.roles;
    } else if (payload.authorities) {
      // authorities puede venir como JSON string o array de objetos/string
      try {
        const parsed = typeof payload.authorities === 'string'
          ? JSON.parse(payload.authorities)
          : payload.authorities;

        if (Array.isArray(parsed)) {
          roles = parsed.map(item => {
            if (typeof item === 'string') return item;
            if (item.authority) return item.authority;
            if (item.name) return item.name;
            return JSON.stringify(item);
          });
        }
      } catch (e) {
        // fallback: si no parsea, ignoramos
        console.warn('decodeToken: no se pudo parsear authorities', e);
      }
    }

    const isAdmin = !!payload.isAdmin;
    const isAssistant = !!payload.isAssistant;
    const isUser = !!payload.isUser;

    return {
      username,
      roles,
      isAdmin,
      isAssistant,
      isUser,
      raw: payload,
    };
  } catch (e) {
    console.error('decodeToken error:', e);
    return null;
  }
};
