import axios from 'axios';
import { Platform } from 'react-native';

function resolveBaseUrl(): string {
  const env = (typeof process !== 'undefined' && (process as any).env && (process as any).env.EXPO_PUBLIC_API_URL) || '';
  if (env) return env;
  if (Platform.OS === 'android') return 'http://10.0.2.2:4000/api';
  if (Platform.OS === 'ios') return 'http://localhost:4000/api';
  return 'http://localhost:4000/api';
}

export const api = axios.create({ baseURL: resolveBaseUrl(), timeout: 8000 });