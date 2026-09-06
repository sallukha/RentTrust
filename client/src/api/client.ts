import { ApiClientError } from '../types/api.types';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

const DEFAULT_API_BASE_URL = 'https://renttrust-drxz.onrender.com/api/v1';

export const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, '') || DEFAULT_API_BASE_URL;

export const AUTH_TOKEN_STORAGE_KEY = 'rental_token';
let inMemoryAuthToken: string | null = null;

export const getStoredAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return inMemoryAuthToken || localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
};

export const setStoredAuthToken = (token: string): void => {
  inMemoryAuthToken = token;
  if (Capacitor.isNativePlatform()) {
    void Preferences.set({ key: AUTH_TOKEN_STORAGE_KEY, value: token });
  } else {
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
  }
};

export const clearStoredAuthToken = (): void => {
  inMemoryAuthToken = null;
  if (Capacitor.isNativePlatform()) {
    void Preferences.remove({ key: AUTH_TOKEN_STORAGE_KEY });
  } else {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  }
};

export const hydrateStoredAuthToken = async (): Promise<string | null> => {
  if (typeof window === 'undefined') return null;

  if (!Capacitor.isNativePlatform()) {
    inMemoryAuthToken = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    return inMemoryAuthToken;
  }

  const stored = await Preferences.get({ key: AUTH_TOKEN_STORAGE_KEY });
  if (stored.value) {
    inMemoryAuthToken = stored.value;
    return stored.value;
  }

  const legacyToken = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  if (legacyToken) {
    inMemoryAuthToken = legacyToken;
    await Preferences.set({ key: AUTH_TOKEN_STORAGE_KEY, value: legacyToken });
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  }

  return inMemoryAuthToken;
};

interface ApiRequestOptions extends RequestInit {
  auth?: boolean;
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  const isFormData = options.body instanceof FormData;

  if (!isFormData && options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (options.auth !== false) {
    const token = getStoredAuthToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      payload && typeof payload === 'object' && 'message' in payload
        ? String(payload.message)
        : `Request failed with status ${response.status}`;
    throw new ApiClientError(message, response.status);
  }

  return payload as T;
}
